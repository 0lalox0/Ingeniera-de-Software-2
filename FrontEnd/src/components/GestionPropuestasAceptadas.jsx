import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';

export const GestionPropuestasAceptadas = () => {
    const navigate = useNavigate();
    const { role } = useUser();
    const [propuestas, setPropuestas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [contador, setContador] = useState(0);
    const [empleado, setEmpleado] = useState(null);
    const [nombreSucursalEmpleado, setNombreSucursalEmpleado] = useState(null);
    const [userId, setUserId] = useState(null);
    const emailLocal = localStorage.getItem("email");

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/empleados/${emailLocal}`);
                const data = await response.json();
                setEmpleado(data);
                const responseSucursal = await fetch(`http://localhost:8000/api/sucursales/${data.sucursal}`);
                const dataSucursal = await responseSucursal.json();
                setNombreSucursalEmpleado(dataSucursal.nombre);
            } catch (error) {
                console.error('Error:', error);
            }
        }

        fetchEmpleado();
    }, []);

    useEffect(() => {
        const fetchPropuestas = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/propuestaIntercambio');
                const data = await response.json();
                const propuestasFiltradas = await Promise.all(data.map(async propuesta => {
                    if (propuesta.estado === "aceptado" || propuesta.estado === "realizado" || propuesta.estado === "norealizado") {
                        const responseDeseado = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoDeseado}`);
                        const productoDeseado = await responseDeseado.json();
                        const responseOfrecido = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoOfrecido}`);
                        const productoOfrecido = await responseOfrecido.json();
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
            setProductos(products);
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

    const redirectEmpleado = () => navigate('/perfilEmpleado');

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
        if (nuevoEstado == 'norealizado') {
            const res = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoOfrecido}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado: 'libre'
                }),
            });

            const resul = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoDeseado}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado: 'libre'
                }),
            });
        }
        // Actualizar el estado de la propuesta en el estado local
        setPropuestas(propuestas.map(p => p._id === propuesta._id ? propuestaActualizada : p));
    }

    const chequearFecha = (fechaIntercambio) => {
        return fechaIntercambio > new Date() ? false : true;
    }

    const aceptarIntercambio = async (propuesta, fecha) => {
        //if (chequearFecha(fecha)) {
        await actualizarEstadoIntercambio(propuesta, 'realizado');
        window.location.reload();
        //}
    }

    const rechazarIntercambio = async (propuesta, fecha) => {
        //if (chequearFecha(fecha)) {
        await actualizarEstadoIntercambio(propuesta, 'norealizado');
        window.location.reload();
        //}
    }

    if (contador < 2)
        return <img src={cargando} width='10%' height='10%' />

    return (
        <>
            {role === 'empleado' ?
                <div className='clase-propuestas'>
                    <div className='titulos titulo-propuestas'>
                        <h1>Propuestas agendadas para intercambiar</h1>
                        <p className='textoRedireccion' onClick={redirectEmpleado}> Volver al perfil</p>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col"> Producto ofrecido </th>
                                <th scope="col"> Foto </th>
                                <th scope="col"> Producto deseado </th>
                                <th scope="col"> Foto </th>
                                <th scope="col"> Categoría </th>
                                <th scope="col"> Sucursal </th>
                                <th scope="col"> Solicitante </th>
                                <th scope='col'> Fecha </th>
                                <th scope='col'> Rango horario </th>
                                <th scope="col"> Estado </th>
                                <th scope="col"> Información </th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {productos.filter((producto, index) => sucursales[index]?.nombre === nombreSucursalEmpleado)
                                .map((producto, index) => {
                                    const fecha = new Date(propuestas[index].fecha);
                                    const fechaString = fecha.toLocaleDateString();
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
                                            <td> {fechaString} </td>
                                            <td> {rango} </td>
                                            <td> {propuestas[index].estado} </td>
                                            {propuestas[index].estado == 'aceptado' ?
                                                <td>
                                                    <button onClick={() => aceptarIntercambio(propuestas[index], fecha)} className="btn btn-success botonEmpleado"> Confirmar Intercambio</button>
                                                    <button onClick={() => rechazarIntercambio(propuestas[index], fecha)} className="btn btn-danger botonEmpleado"> Cancelar Intercambio</button>
                                                </td>
                                                : <td>
                                                    {propuestas[index].estado == 'realizado' ?
                                                        <p style={{ color: '#07f717' }}> Intercambio registrado</p>
                                                        : <>
                                                            {propuestas[index].estado == 'norealizado' ?
                                                                <p style={{ color: 'red' }}> Intercambio cancelado</p>
                                                                :
                                                                null

                                                            }
                                                        </>
                                                    }
                                                </td>
                                            }
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
                : <> <Mantenimiento> </Mantenimiento></>}
        </>
    )
}