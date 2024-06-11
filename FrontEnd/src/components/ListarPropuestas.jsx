import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import useUser from '../hooks/useUser';

export const ListarPropuestas = () => {
    const navigate = useNavigate();
    const { role } = useUser();
    const [propuestas, setPropuestas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [contador, setContador] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8000/api/propuestaIntercambio')
            .then(response => response.json())
            .then(data => { setPropuestas(data), setContador(contador + 1) })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            const products = await Promise.all(propuestas.map(async (propuesta) => {
                const response = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoOfrecido}`);

                let ofrecido = await response.json();
                const res = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoDeseado}`);
                let deseado = await res.json();
                setContador(contador + 1);
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
                setContador(contador + 1);
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
                setContador(contador + 1);
                return data;
            }));
            setUsuarios(users);
        }
        fetchUsuarios();
    }, [productos]);

    const redirectGestion = () => navigate('/perfilUsuario/intercambios');

    const aceptarIntercambio = (propuesta) => {
        console.log(propuesta);
        // post
    }
    const rechazarIntercambio = (propuesta) => {
        console.log(propuesta);
        // post
    }

    if (contador < 2)
        return <img src={cargando} width='10%' height='10%' />

    return (
        <>
            {role === 'cliente' ?
                <div className='clase-propuestas'>
                    <div className='titulos titulo-propuestas'>
                        <h1>Propuestas pendientes</h1>
                        <p className='textoRedireccion' onClick={redirectGestion}> Volver a la gestión de intercambios</p>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Producto ofrecido</th>
                                <th scope="col">Foto</th>
                                <th scope="col">Producto deseado</th>
                                <th scope="col">Foto</th>
                                <th scope="col">Categoría</th>
                                <th scope="col">Sucursal</th>
                                <th scope="col">Solicitante</th>
                                <th scope='col'> Fecha </th>
                                <th scope='col'> Rango horario </th>
                                <th scope="col"> Información </th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {productos.map((producto, index) => {
                                const fecha = new Date(propuestas[index].fecha);
                                const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth()}/${fecha.getFullYear()}`;
                                const rango = `${producto.deseado.inicioRango} - ${producto.deseado.finRango}`;
                                return (
                                    <tr key={propuestas[index]._id}>
                                        <td> {producto.ofrecido.titulo} </td>
                                        <td> <img src={producto.ofrecido.urlFotos[0]} width='80px' height='60px' /> </td>
                                        <td> {producto.deseado.titulo} </td>
                                        <td> <img src={producto.deseado.urlFotos[0]} width='80px' height='60px' /> </td>
                                        <td> {producto.ofrecido.categoria} </td>
                                        <td> {sucursales[index]?.nombre} </td>
                                        <td> {usuarios[index]?.name} {usuarios[index]?.lastname} </td>
                                        <td> {fechaFormateada} </td>
                                        <td> {rango} </td>
                                        {producto.deseado.idUsuario == localStorage.getItem("email") ? <>
                                            <td> <p style={{ color: '#439ac8' }}> ¿Te interesa este intercambio? ¡Aceptalo! </p>
                                                <button onClick={() => aceptarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-success"> Aceptar Intercambio</button>
                                                <button onClick={() => rechazarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-danger"> Rechazar Intercambio</button>
                                            </td>
                                        </> :
                                            <>
                                                <td> <p style={{ color: '#439ac8' }}> Has solicitado este intercambio. </p></td>
                                            </>}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                : <> </>}
        </>
    )
}