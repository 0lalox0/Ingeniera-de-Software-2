import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import { useNavigate } from 'react-router-dom';
import useUser from "../hooks/useUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faLeftLong } from '@fortawesome/free-solid-svg-icons'

export const ProductoIntercambio = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState(null);
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [mensaje, setMensaje] = useState(null);
    const [fechaSeleccionada, setFechaSeleccionada] = useState(undefined);
    const id = useParams().id;
    const refFecha = useRef(null);

    const redirectIntercambios = () => navigate('/intercambios');

    const redirectProponer = () => {
        localStorage.setItem("date", fechaSeleccionada);
        navigate(`/elegiProducto/${id}`);
    }

    useEffect(() => {
        fetch(`http://localhost:8000/api/prodintercambios/${id}`)
            .then(response => response.json())
            .then(data => { setProducto(data); setLoading(false) })
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/users/user')
            .then(response => response.json())
            .then(data => setUsuario(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const getDias = (nombreDia) => {
        const dias = {
            'lunes': 1,
            'martes': 2,
            'miércoles': 3,
            'jueves': 4,
            'viernes': 5
        };
        return dias[nombreDia];
    }

    const chequearFecha = () => {
        if (!fechaSeleccionada) {
            setMensaje('Se debe elegir una fecha.');
            return false;
        }
        if (fechaSeleccionada < new Date()) {
            setMensaje('Se debe elegir una fecha a futuro.');
            return false;
        }
        if (getDias(producto.dia) !== fechaSeleccionada.getUTCDay()) {
            setMensaje('Se debe elegir una fecha del día ' + producto.dia + '.');
            return false;
        }
        return true;
    }

    const cambiarFecha = (e) => {
        const [year, month, day] = e.target.value.split('-');
        const fechaSeleccionada = new Date(year, month - 1, day);
        setFechaSeleccionada(fechaSeleccionada);
    }

    const elegirFecha = () => refFecha.current.style.display = 'flex';

    const enviarPropuesta = () => {
        if (chequearFecha()) {
            localStorage.setItem('categoria', producto.categoria);
            redirectProponer();
        }
    }

    const siguiente = () => {
        currentIndex == 0 ? setCurrentIndex(1) : setCurrentIndex(0);
    }

    if (loading)
        return <img src={cargando} width='10%' height='10%' />

    return (
        <>
            <div className="ver-intercambio">
                <h2> {producto.titulo} </h2>
                <p className="textoRedireccion" onClick={redirectIntercambios}> Volver a los productos para intercambiar</p>
                <div className="intercambio-contenido">
                    <div className="intercambio-fotos">
                        {
                            producto.urlFotos.length > 1 ?
                                <>
                                    <div className="carrusel">
                                        <img id='fotoCarrusel' src={producto.urlFotos[currentIndex]} alt={`Imagen ${currentIndex + 1}`} />
                                        <div className="buttonsCarrusel">
                                            <button onClick={siguiente}>
                                                <FontAwesomeIcon icon={faLeftLong} />
                                            </button>
                                            <button onClick={siguiente}>
                                                <FontAwesomeIcon icon={faRightLong} />
                                            </button>
                                        </div>
                                    </div>
                                </>
                                : <img src={producto.urlFotos[0]} />
                        }
                    </div>
                    <div className="intercambio-detalles">
                        <p> Descripción del producto: {producto.descripcion}. </p>
                        <p> Intercambio a realizar en la {producto.nombreSucursal} desde las {producto.inicioRango} hasta las {producto.finRango}, los días {producto.dia}.</p>
                        <p> Categoría del producto: {producto.categoria}.</p>
                        <p> Publicado por: {producto.nombre} {producto.apellido}.</p>
                        {role === 'cliente' && producto.idUsuario !== localStorage.getItem("email") ? <>
                            <p style={{ color: '#439ac8' }}> ¿Te interesa este producto? ¡Proponele a {producto.nombre} de intercambiarlo por un producto tuyo!</p>
                            <button onClick={elegirFecha} id='botonFecha' className="btn btn-success"> Elegir fecha </button>
                        </> : <> </>}

                        <div className='seleccionFecha' ref={refFecha} style={{ display: 'none' }}>
                            <div style={{ display: 'block' }}>
                                <label htmlFor="fechaIntercambiar"> Elegí un día para intercambiar</label>
                                <input type="date" id='fechaIntercambiar' onChange={cambiarFecha} />
                                <p className='errorContainer'> {mensaje} </p>
                            </div>
                            <button onClick={enviarPropuesta} id='botonProponer' className="btn btn-success"> Enviar propuesta </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
