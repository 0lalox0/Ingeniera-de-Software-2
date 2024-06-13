import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import useUser from '../hooks/useUser';
import Modal from 'react-modal';
import { Mantenimiento } from './Mantenimiento';
Modal.setAppElement('#root');

export const ListarPropuestas = () => {
    const navigate = useNavigate();
    const { role } = useUser();
    const [propuestas, setPropuestas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [contador, setContador] = useState(0);
    const[propuestasI, setPropuestasI] = useState([]);
    const [userId, setUserId] = useState(null);
    const emailLocal = localStorage.getItem("email");
    const [puntajeElegido, setPuntajeElegido] = useState("");

    //POP UP MODAL
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rating, setRating] = useState('');
    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    //ACTUALIZAR PUNTOS DE USUARIO
    const sumarPuntos = async (puntaje, idUsuario, tipoUsuario, idPropuesta) => {
        setModalIsOpen(false);

        const response = await fetch(`http://localhost:8000/api/users/${idUsuario}`);
        let data = await response.json();

        if (data.puntos === null) {
            data.puntos = puntaje;
        } else {
            data.puntos = parseFloat(data.puntos) + parseFloat(puntaje);
        }

        if (data.cantidadVotos === null) {
            data.cantidadVotos = 1;
        } else {
            data.cantidadVotos++;
        }

        await updateData(data, idUsuario);
        await updatePropuestaIntercambio(tipoUsuario, idPropuesta);
    };

    const updateData = async (data, idUsuario) => {
        await fetch(`http://localhost:8000/api/users/${idUsuario}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
    };

    const updatePropuestaIntercambio = async (tipoUsuario, idPropuesta) => {
        let data = {};

        if (tipoUsuario === 'Deseado') {
            data = { calificoDeseado: true };
        } else if (tipoUsuario === 'Ofrecido') {
            data = { calificoOfrecido: true };
        }

        await fetch(`http://localhost:8000/api/propuestaIntercambio/${idPropuesta}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        window.location.reload();
    };

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
                console.log(propuestasFiltradas.filter(Boolean));
                setPropuestasI(propuestasFiltradas.filter(Boolean));
                //setContador(contador + 1);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchPropuestas();
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            console.log(propuestasI);
            const products = await Promise.all(propuestasI.map(async (propuesta) => {

                if (propuesta.estado == 'pendiente') {
                    const response = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoOfrecido}`);
                    let ofrecido = await response.json();
                    const res = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoDeseado}`);
                    let deseado = await res.json();
                    //setContador(contador + 1);
                    return {
                        ofrecido: ofrecido,
                        deseado: deseado
                    };
                } else {
                    const response = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoOfrecido}`);
                    let ofrecido = await response.json();
                    const res = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoDeseado}`);
                    let deseado = await res.json();
                    ofrecido.estado = 'libre';
                    deseado.estado = 'libre';
                    //setContador(contador + 1);
                    return {
                        ofrecido: ofrecido,
                        deseado: deseado
                    };
                }
            }));
            let e = localStorage.getItem("email");
            console.log(products);
            setProductos(products.filter(o => (o.ofrecido && o.ofrecido.idUsuario === e || o.deseado && o.deseado.idUsuario === e) &&
                (o.ofrecido.estado == 'libre') && (o.deseado.estado == 'libre')));

            let productosOcupados = products.filter(o => (o.ofrecido && o.ofrecido.idUsuario === e || o.deseado && o.deseado.idUsuario === e) &&
                (o.ofrecido.estado == 'ocupado') || (o.deseado.estado == 'ocupado'));
           // console.log(propuestasI);
           console.log(productosOcupados);
            let propuestasPendientes = propuestasI.filter(p => p.estado === 'pendiente');
            console.log(propuestasPendientes);
            let propuestasFiltradas = propuestasPendientes.filter(p => {
                let productoOfrecidoOcupado = productosOcupados.some(po => po.ofrecido._id == p.productoDeseado);
                let productoDeseadoOcupado = productosOcupados.some(po => po.deseado._id == p.productoOfrecido);
                return !productoOfrecidoOcupado && !productoDeseadoOcupado;
            });
            console.log(propuestasI);
            console.log(propuestasFiltradas);
            let propuestasActualizadas = propuestasI.filter(o => !propuestasFiltradas.some(pf => pf._id === o._id));
            setPropuestas(propuestasActualizadas);
            console.log(propuestasActualizadas)
            setContador(contador + 1)
    }
    if(propuestasI.length > 0)
         fetchProductos();
    }, [propuestasI]);

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
        if (nuevoEstado == 'aceptado') {
            const res = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoOfrecido}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado: 'ocupado'
                }),
            });

            const resul = await fetch(`http://localhost:8000/api/prodIntercambios/${propuesta.productoDeseado}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    estado: 'ocupado'
                }),
            });
        }
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

    Modal.setAppElement('#root');

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
                                <th scope="col" >Producto ofrecido </th>
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
                                const fechaString = new Date(propuestas[index].fecha).toLocaleDateString();
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
                                        <td>
                                            {producto.deseado.idUsuario == localStorage.getItem("email") ?
                                                <>
                                                    {propuestas[index].estado == 'pendiente' ?
                                                        <>
                                                            <p style={{ color: '#439ac8' }}> ¿Te interesa este intercambio? ¡Aceptalo! </p>
                                                            <button onClick={() => aceptarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-success"> Aceptar Intercambio</button>
                                                            <button onClick={() => rechazarIntercambio(propuestas[index])} id='botonFecha' className="btn btn-danger"> Rechazar Intercambio</button>
                                                        </>
                                                        :
                                                        <>
                                                            {propuestas[index].estado == 'aceptado' ?
                                                                <p style={{ color: '#07f717' }}> ¡Has aceptado este intercambio!</p>
                                                                :
                                                                <>
                                                                    {propuestas[index].estado == 'rechazado' ?
                                                                        <p style={{ color: 'red' }}> Has rechazado esta propuesta de intercambio.</p>
                                                                        :
                                                                        <>
                                                                            {propuestas[index].estado == 'realizado' ?
                                                                                <>
                                                                                    <p style={{ color: '#07f717' }}> Intercambio realizado.</p>
                                                                                    {!propuestas[index].calificoOfrecido ? (
                                                                                        <button id='botonFecha' className="btn btn-warning" onClick={openModal}> Valorar usuario</button>
                                                                                    ) : (
                                                                                        <p style={{ color: '#fcba03' }}> ¡Has calificado al usuario!</p>
                                                                                    )}
                                                                                    <Modal
                                                                                        isOpen={modalIsOpen}
                                                                                        onRequestClose={closeModal}
                                                                                        contentLabel="Valorar usuario"
                                                                                        style={{
                                                                                            content: {
                                                                                                width: '150px',
                                                                                                height: '200px',
                                                                                                margin: 'auto',
                                                                                                overflow: 'hidden',
                                                                                                position: 'fixed',
                                                                                                top: '50%',
                                                                                                left: '50%',
                                                                                                transform: 'translate(30%, -120%)'
                                                                                            },
                                                                                        }}
                                                                                    >
                                                                                        <form>
                                                                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                                                                <div key={value}>
                                                                                                    <input
                                                                                                        type="radio"
                                                                                                        id={`rating-${value}`}
                                                                                                        name="rating"
                                                                                                        value={value}
                                                                                                        checked={rating === value}
                                                                                                        onChange={(e) => { setPuntajeElegido(e.target.value); setRating(e.target.value); }}
                                                                                                    />
                                                                                                    <label htmlFor={`rating-${value}`}>{value}</label>
                                                                                                </div>
                                                                                            ))}
                                                                                        </form>
                                                                                        <button onClick={(event) => sumarPuntos(puntajeElegido, producto.ofrecido.idUsuario, 'Ofrecido', propuestas[index]._id)}>Guardar</button>
                                                                                    </Modal>
                                                                                </>
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
                                                </>
                                                :
                                                <>
                                                    <p style={{ color: '#439ac8' }}> Has solicitado este intercambio. </p>
                                                    {propuestas[index].estado == 'aceptado' ?
                                                        <p style={{ color: '#07f717' }}> ¡Han aceptado este intercambio!</p>
                                                        :
                                                        <>
                                                            
                                                            {propuestas[index].estado == 'rechazado' ?
                                                                <p style={{ color: 'red' }}> Han rechazado tu propuesta de intercambio.</p>
                                                                :
                                                                <>
                                                                    {propuestas[index].estado == 'realizado' ?
                                                                        <>
                                                                            <p style={{ color: '#07f717' }}> Intercambio realizado.</p>

                                                                            {propuestas[index].calificoDeseado === false ? (
                                                                                <button id='botonFecha' className="btn btn-warning" onClick={openModal}> Valorar usuario</button>
                                                                            ) : (
                                                                                <p style={{ color: '#fcba03' }}>¡Has calificado al usuario!</p>
                                                                            )}
                                                                            <Modal
                                                                                isOpen={modalIsOpen}
                                                                                onRequestClose={closeModal}
                                                                                contentLabel="Valorar usuario"
                                                                                style={{
                                                                                    content: {
                                                                                        width: '150px',
                                                                                        height: '200px',
                                                                                        margin: 'auto',
                                                                                        overflow: 'hidden',
                                                                                        position: 'fixed',
                                                                                        top: '50%',
                                                                                        left: '50%',
                                                                                        transform: 'translate(30%, -120%)'
                                                                                    },
                                                                                }}
                                                                            >
                                                                                <form>
                                                                                    {['1', '2', '3', '4', '5'].map((value) => (
                                                                                        <div key={value}>
                                                                                            <input
                                                                                                type="radio"
                                                                                                id={`rating-${value}`}
                                                                                                name="rating"
                                                                                                value={value}
                                                                                                checked={rating === value}
                                                                                                onChange={(e) => { setPuntajeElegido(e.target.value); setRating(e.target.value); }}
                                                                                            />
                                                                                            <label htmlFor={`rating-${value}`}>{value}</label>
                                                                                        </div>
                                                                                    ))}
                                                                                </form>
                                                                                <button onClick={(event) => sumarPuntos(puntajeElegido, producto.deseado.idUsuario, 'Deseado', propuestas[index]._id)}>Guardar</button>
                                                                            </Modal>

                                                                        </>
                                                                        :
                                                                        <>
                                                                            {propuestas[index].estado == 'norealizado' ?
                                                                                <p style={{ color: 'red' }}> Intercambio cancelado.</p>
                                                                                :
                                                                                <>
                                                                                    <p style={{ color: '#439ac8' }}> La propuesta todavía no ha sido considerada.</p>
                                                                                </>
                                                                            }
                                                                        </>
                                                                    }
                                                                </>
                                                            }
                                                        </>
                                                    }
                                                </>
                                            }
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                :
                <> <Mantenimiento> </Mantenimiento> </>
            }
        </>
    )
}