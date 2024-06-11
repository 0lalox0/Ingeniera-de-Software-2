import React, { useState, useEffect } from 'react'

export const ListarPropuestas = () => {
    const [propuestas, setPropuestas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [usuarios, setUsuarios] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/propuestaIntercambio')
            .then(response => response.json())
            .then(data => setPropuestas(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            const products = await Promise.all(propuestas.map(async (propuesta) => {
                const response = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoOfrecido}`);
               
                let ofrecido = await response.json();
                const res = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoDeseado}`);
                let deseado = await res.json();
                return {
                    ofrecido: ofrecido,
                    deseado: deseado
                };
            }));
            let e = localStorage.getItem("email");
            setProductos(products.filter(o => o.ofrecido.idUsuario === e || o.deseado.idUsuario === e));
        }
        fetchProductos();
    }, [propuestas]);
    

    useEffect(() => {
        const fetchSucursales = async () => {
            const branches = await Promise.all(productos.map(async (producto) => {
                const response = await fetch(`http://localhost:8000/api/sucursales/${producto.deseado.sucursal}`);
                const data = await response.json();
                return data;
            }));
            setSucursales(branches);
        }
        fetchSucursales();
    }, [productos]);

    useEffect(() => {
        const fetchUsuarios = async () => {
            const users = await Promise.all(productos.map(async (producto) => {
                const response = await fetch(`http://localhost:8000/api/users/${producto.ofrecido.idUsuario}`);
                const data = await response.json();
                return data;
            }));
            setUsuarios(users);
        }
        fetchUsuarios();
    }, [productos]);
    const aceptarIntercambio = (propuesta) => {
        console.log(propuesta);
    }
    const rechazarIntercambio = (propuesta) => {
        console.log(propuesta);
    }
  
    return (
        <div className='clase-propuestas'>
            <div className='titulo-propuestas'>
                <h1 style={{ color: "#242465" }}>Propuestas pendientes</h1>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th style={{ color: "#242465" }} scope="col">NombreOfrecido</th>
                        <th style={{ color: "#242465" }} scope="col">NombreDeseado</th>
                        <th style={{ color: "#242465" }} scope="col">Fotos</th>
                        <th style={{ color: "#242465" }} scope="col">Categoria</th>
                        <th style={{ color: "#242465" }} scope="col">Sucursal</th>
                        <th style={{ color: "#242465" }} scope="col">Solicitante</th>

                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {productos.map((producto, index) => {
                        return (
                            <tr key={propuestas[index]._id}>
                                <td>{producto.ofrecido.titulo}</td>
                                <td>{producto.deseado.titulo}</td>
                                <td>
                                    <img src={producto.ofrecido.urlFotos[0]} width='80px' height='60px' />
                                    <img src={producto.deseado.urlFotos[0]} width='80px' height='60px' />
                                </td>
                                <td>{producto.ofrecido.categoria}</td>
                                <td>{sucursales[index]?.nombre}</td>
                                <td>{usuarios[index]?.name} {usuarios[index]?.lastname}</td>
                                {producto.deseado.idUsuario !== localStorage.getItem("email") ? <>
                                <p style={{ color: '#439ac8' }}> ¿Te interesa este intercambio? ¡Aceptalo!</p>
                                <td>
                                    <button onClick={() => aceptarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-success"> Aceptar Intercambio</button>
                                    <button onClick={() => rechazarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-success"> Rechazar Intercambio</button>

                                </td>
                                </> : <> </>}
                                
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}