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

    const [userId, setUserId] = useState(null);
    const emailLocal = localStorage.getItem("email");

    useEffect(() => {

        const fetchPropuestas = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/propuestaIntercambio');
                const data = await response.json();
                const propuestasFiltradas = await Promise.all(data.map(async propuesta => {
                    const responseDeseado = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoDeseado}`);
                    const productoDeseado = await responseDeseado.json();
                    const responseOfrecido = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoOfrecido}`);
                    const productoOfrecido = await responseOfrecido.json();
                    if (productoDeseado.idUsuario === emailLocal || productoOfrecido.idUsuario === emailLocal) {
                        return propuesta;
                    }
                }));
                setPropuestas(propuestasFiltradas.filter(Boolean));
                setContador(contador + 1);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPropuestas();
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
            setProductos(products.filter(o => o.ofrecido && o.ofrecido.idUsuario === e || o.deseado && o.deseado.idUsuario === e));
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

    const actualizarEstadoIntercambio = async (propuesta, nuevoEstado) => {
        const response = await fetch(`http://localhost:8000/api/propuestaIntercambio/${propuesta._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...propuesta,
                estado: nuevoEstado,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const propuestaActualizada = await response.json();

        // Actualizar el estado de la propuesta en el estado local
        setPropuestas(propuestas.map(p => p._id === propuesta._id ? propuestaActualizada : p));
    }

    const aceptarIntercambio = async (propuesta) => {
        await actualizarEstadoIntercambio(propuesta, 'aceptado');
        window.location.reload(); // Refrescar la página
    }

    const rechazarIntercambio = async (propuesta) => {
        await actualizarEstadoIntercambio(propuesta, 'rechazado');
        window.location.reload(); // Refrescar la página
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
                                <th scope="col">Estado</th>
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
                                const fechaString = fecha.toLocaleDateString();
                                const fechaFormateada = `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()}`;
                                const rango = `${producto.deseado.inicioRango} - ${producto.deseado.finRango}`;
                                return (
                                    <tr key={propuestas[index]._id}>
                                        <td> {propuestas[index].estado} </td>
                                        <td> {producto.ofrecido.titulo} </td>
                                        <td> <img src={producto.ofrecido.urlFotos[0]} width='80px' height='60px' /> </td>
                                        <td> {producto.deseado.titulo} </td>
                                        <td> <img src={producto.deseado.urlFotos[0]} width='80px' height='60px' /> </td>
                                        <td> {producto.ofrecido.categoria} </td>
                                        <td> {sucursales[index]?.nombre} </td>
                                        <td> {usuarios[index]?.name} {usuarios[index]?.lastname} </td>
                                        <td> {fechaString} </td>
                                        <td> {rango} </td>
                                        {producto.deseado.idUsuario == localStorage.getItem("email") ? <>
                                            {propuestas[index].estado == 'pendiente' ?
                                                <td> <p style={{ color: '#439ac8' }}> ¿Te interesa este intercambio? ¡Aceptalo! </p>
                                                    .              <button onClick={() => aceptarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-success"> Aceptar Intercambio</button>
                                                    <button onClick={() => rechazarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-danger"> Rechazar Intercambio</button>
                                                </td>
                                                : <>
                                                    {propuestas[index].estado == 'aceptado' ?
                                                        <p style={{ color: '#07f717' }}> ¡Has aceptado este intercambio!</p>
                                                        : <>
                                                            {propuestas[index].estado == 'rechazado' ?
                                                                <p style={{ color: 'red' }}> Has rechazado esta propuesta de intercambio.</p>
                                                                :
                                                                <>
                                                                    {propuestas[index].estado == 'realizado' ?

                                                                        <td> <p style={{ color: '#07f717' }}> Intercambio realizado.</p>
                                                                            <p style={{ color: '#439ac8' }}> Valorar usuario.</p>
                                                                        </td>
                                                                        :
                                                                        <>
                                                                            {propuestas[index].estado == 'norealizado' ?
                                                                                <p style={{ color: 'red' }}> Intercambio cancelado.</p>
                                                                                :
                                                                                null

                                                                            }
                                                                        </>

                                                                    }
                                                                </>

                                                            }
                                                        </>
                                                    }
                                                </>
                                            }


                                        </> :
                                            <>
                                                <td> <p style={{ color: '#439ac8' }}> Has solicitado este intercambio. </p>
                                                    {propuestas[index].estado == 'aceptado' ?
                                                        <p style={{ color: '#07f717' }}> ¡Han aceptado este intercambio!</p>
                                                        : <>
                                                            {propuestas[index].estado == 'rechazado' ?
                                                                <p style={{ color: 'red' }}> Han rechazado tu propuesta de intercambio.</p>
                                                                : <>
                                                                    <p style={{ color: '#439ac8' }}> La propuesta todavía no ha sido considerada.</p>
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </td>
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