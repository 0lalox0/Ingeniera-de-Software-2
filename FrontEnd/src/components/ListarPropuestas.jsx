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
                const data = await response.json();
                return data;
            }));
            setProductos(products);
        }
        fetchProductos();
    }, [propuestas]);

    useEffect(() => {
        const fetchSucursales = async () => {
            const branches = await Promise.all(productos.map(async (producto) => {
                const response = await fetch(`http://localhost:8000/api/sucursales/${producto.sucursal}`);
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
                const response = await fetch(`http://localhost:8000/api/users/${producto.idUsuario}`);
                const data = await response.json();
                return data;
            }));
            setUsuarios(users);
        }
        fetchUsuarios();
    }, [productos]);

    return (
        <div className='clase-propuestas'>
            <div className='titulo-propuestas'>
                <h1 style={{ color: "#242465" }}>Propuestas pendientes</h1>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th style={{ color: "#242465" }} scope="col">Nombre</th>
                        <th style={{ color: "#242465" }} scope="col">Descripción</th>
                        <th style={{ color: "#242465" }} scope="col">Foto</th>
                        <th style={{ color: "#242465" }} scope="col">Categoria</th>
                        <th style={{ color: "#242465" }} scope="col">Sucursal</th>
                        <th style={{ color: "#242465" }} scope="col">Solicitante</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {productos.map((producto, index) => {
                        return (
                            <tr key={propuestas[index]._id}>
                                <td>{producto.titulo}</td>
                                <td>{producto.descripcion}</td>
                                <td>
                                    <img src={producto.urlFotos[0]} width='80px' height='60px' />
                                </td>
                                <td>{producto.categoria}</td>
                                <td>{sucursales[index]?.nombre}</td>
                                <td>{usuarios[index]?.name} {usuarios[index]?.lastname}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}