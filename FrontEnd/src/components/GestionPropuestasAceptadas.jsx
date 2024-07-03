import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import Modal from 'react-modal';
import { faWindows } from '@fortawesome/free-brands-svg-icons';
Modal.setAppElement('#root');

export const GestionPropuestasAceptadas = () => {
    const navigate = useNavigate();
    const { role } = useUser();
    const [propuestas, setPropuestas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [contador, setContador] = useState(true);
    const [empleado, setEmpleado] = useState(null);
    const [nombreSucursalEmpleado, setNombreSucursalEmpleado] = useState(null);
    const [userId, setUserId] = useState(null);
    const emailLocal = localStorage.getItem("email");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [precio, setPrecio] = useState(0);
    const [message, setMessage] = useState("");
    const refMensaje = useRef(null);

    const openModal = () => setModalIsOpen(true);

    const closeModal = () => setModalIsOpen(false);

    useEffect(() => {
        const fetchEmpleado = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/empleados/${emailLocal}`);
                const data = await response.json();
                setEmpleado(data);
            } catch (error) {
                console.error('Error al obtener el empleado:', error);
            }
        };

        fetchEmpleado();
    }, []);

    useEffect(() => {
        if (empleado) {
            const fetchSucursalYPropuestas = async () => {
                try {
                    const responseSucursal = await fetch(`http://localhost:8000/api/sucursales/${empleado.sucursal}`);
                    const dataSucursal = await responseSucursal.json();
                    setNombreSucursalEmpleado(dataSucursal.nombre);
                    const response = await fetch(`http://localhost:8000/api/filtrarPropuestaIntercambios?nombreSucursal=${encodeURIComponent(dataSucursal.nombre + " ")}`);
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
                    setContador(false);
                } catch (error) {
                    console.error('Error al obtener la sucursal o las propuestas:', error);
                }
            };

            fetchSucursalYPropuestas();
        }
    }, [empleado]);

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
            setProductos(products);
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
    const registarCompra = async (propuesta) => {
        console.log(propuesta);
        if (precio > 0) {
            let n = new Date();
            try {
                const response = await fetch("http://localhost:8000/api/productoCompra", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        precio: precio,
                        nombreSucursal: nombreSucursalEmpleado,
                        idEmpleado: empleado._id,
                        fecha: n
                    })
                });
            } catch (error) {
                console.error('Error:', error);
            }
            
        }
        const res = await fetch(`http://localhost:8000/api/propuestaIntercambio/${propuesta._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                registrado : true
            }),
        });
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        closeModal();
        window.location.reload();
    }
    if (contador)
        return <img src={cargando} width='10%' height='10%' />

    Modal.setAppElement('#root');

    return (
        <>
            {role === 'empleado' ?
                <div className='clase-propuestas propuestasIntercambios'>
                    <div className='titulos titulo-propuestas'>
                        <h1>Propuestas agendadas para intercambiar</h1>
                        <small className="text-body-secondary"> Listando intercambios a realizar en la sucursal {nombreSucursalEmpleado}</small>
                        <p className='textoRedireccion' onClick={redirectEmpleado}> Volver a la gestión</p>
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
                            {productos.map((producto, index) => {
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
                                                <button onClick={() => aceptarIntercambio(propuestas[index], fecha)} className="btn btn-success" style={{ margin: '5px' }}> Confirmar Intercambio</button>
                                                <button onClick={() => rechazarIntercambio(propuestas[index], fecha)} className="btn btn-danger" style={{ margin: '5px' }}> Cancelar Intercambio</button>
                                            </td>
                                            : <td>
                                                {propuestas[index].estado == 'realizado' ?
                                                    <>
                                                        <p style={{ color: '#07f717' }}> Intercambio registrado</p>
                                                        {propuestas[index].registrado === false && (
                                                        <>
                                                            <button id='botonFecha' onClick={openModal} className='btn btn-warning'> Registrar Compra</button>  
                                                            <Modal
                                                                isOpen={modalIsOpen}
                                                                onRequestClose={closeModal}
                                                                contentLabel="Valorar usuario"
                                                                style={{
                                                                    content: {
                                                                        width: '15rem',
                                                                        height: '15rem',
                                                                        margin: 'auto',
                                                                        overflow: 'hidden',
                                                                        position: 'fixed',
                                                                        top: '100%',
                                                                        left: '50%',
                                                                        transform: 'translate(30%, -120%)'
                                                                    },
                                                                }}
                                                            >
                                                                <form>
                                                                    <p style={{textAlign: 'center'}}> Ingrese precio de la compra realizada: </p>
                                                                    <input type="number" value={precio} onChange={e => setPrecio(e.target.value)} style={{width: '100%'}} min={0}/>
                                                                </form>
                                                                <button onClick={() => registarCompra(propuestas[index])} className='btn btn-warning' style={{margin: '10px'}}>Guardar Compra</button>
                                                                <p className='errorContainer' ref={refMensaje}> {message} </p>
                                                            </Modal>
                                                        </>
                                                        )}                                                       
                                                    </>
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