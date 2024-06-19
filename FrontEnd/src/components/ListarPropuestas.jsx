import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import useUser from '../hooks/useUser';
import Modal from 'react-modal';
import { Mantenimiento } from './Mantenimiento';
import { InformacionPropuesta } from './InformacionPropuesta';
Modal.setAppElement('#root');

export const ListarPropuestas = () => {
    const navigate = useNavigate();
    const { role } = useUser();
    const [propuestas, setPropuestas] = useState([]);
    const [productos, setProductos] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [contador, setContador] = useState(true);
    const [propuestasI, setPropuestasI] = useState([]);
    const [userId, setUserId] = useState(null);
    const emailLocal = localStorage.getItem("email");
    const [puntajeElegido, setPuntajeElegido] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rating, setRating] = useState('');

    const openModal = () => setModalIsOpen(true);

    const closeModal = () => setModalIsOpen(false);

    //ACTUALIZAR PUNTOS DE USUARIO
    const sumarPuntos = async (puntaje, idUsuario, tipoUsuario, idPropuesta) => {
        setModalIsOpen(false);
        const response = await fetch(`http://localhost:8000/api/users/${idUsuario}`);
        let data = await response.json();
        if (data.puntos === null)
            data.puntos = puntaje;
        else
            data.puntos = parseFloat(data.puntos) + parseFloat(puntaje);
        if (data.cantidadVotos === null)
            data.cantidadVotos = 1;
        else
            data.cantidadVotos++;
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
                setPropuestasI(propuestasFiltradas.filter(Boolean));
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchPropuestas();
    }, []);

    useEffect(() => {
        const fetchProductos = async () => {
            const products = await Promise.all(propuestasI.map(async (propuesta) => {
                if (propuesta.estado == 'pendiente') {
                    const response = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoOfrecido}`);
                    let ofrecido = await response.json();
                    const res = await fetch(`http://localhost:8000/api/prodintercambios/${propuesta.productoDeseado}`);
                    let deseado = await res.json();
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
                    return {
                        ofrecido: ofrecido,
                        deseado: deseado
                    };
                }
            }));
            setProductos(products.filter(o => (o.ofrecido && o.ofrecido.idUsuario === emailLocal || o.deseado && o.deseado.idUsuario === emailLocal) &&
                (o.ofrecido.estado == 'libre') && (o.deseado.estado == 'libre')));
            let productosOcupados = products.filter(o => (o.ofrecido && o.ofrecido.idUsuario === emailLocal || o.deseado && o.deseado.idUsuario === emailLocal) &&
                (o.ofrecido.estado == 'ocupado') || (o.deseado.estado == 'ocupado'));
            let propuestasPendientes = propuestasI.filter(p => p.estado === 'pendiente');
            if (productosOcupados.length > 0) {
                let propuestasFiltradas = propuestasPendientes.filter(p => {
                    return !productosOcupados.some(po => po.ofrecido._id == p.productoDeseado) && !productosOcupados.some(po => po.deseado._id == p.productoOfrecido);
                });
                let propuestasActualizadas = propuestasI.filter(o => !propuestasFiltradas.some(pf => pf._id === o._id));
                setPropuestas(propuestasActualizadas);
            } else
                setPropuestas(propuestasI);
            setContador(false);
        }
        if (propuestasI.length > 0)
            fetchProductos();
    }, [propuestasI]);

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
        setPropuestas(propuestas.map(p => p._id === propuesta._id ? propuestaActualizada : p));
    }

    const realizarIntercambio = async (propuesta, estado) => {
        await actualizarEstadoIntercambio(propuesta, estado);
        window.location.reload();
    }

    if (contador)
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
                                        <InformacionPropuesta
                                            meMandaron={producto.deseado.idUsuario == localStorage.getItem("email")}
                                            propuesta={propuestas[index]}
                                            realizarIntercambio={realizarIntercambio}
                                            idUsuarioOfrecido={producto.ofrecido.idUsuario}
                                            updateData={updateData}
                                            updatePropuestaIntercambio={updatePropuestaIntercambio}
                                            idUsuarioDeseado={producto.deseado.idUsuario}
                                        />
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