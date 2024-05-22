import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import { useNavigate } from 'react-router-dom';
import useUser from "../hooks/useUser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong, faLeftLong } from '@fortawesome/free-solid-svg-icons'

export const ProductoIntercambio = () => {
    const { role } = useUser();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const id = useParams().id;
    const navigate = useNavigate();

    const redirectIntercambios = () => navigate('/intercambios');

    useEffect(() => {
        fetch(`http://localhost:8000/api/prodintercambios/${id}`)
            .then(response => response.json())
            .then(data => { setProducto(data); setLoading(false) })
            .catch(error => console.error('Error:', error));
    }, []);

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
                        <p> Descripción del producto: {producto.descripcion} </p>
                        <p> Sucursal donde se realizará el intercambio: {producto.nombreSucursal} en el rango horario desde las {producto.inicioRango} hasta las {producto.finRango}</p>
                        <p> Publicado por: {producto.nombre} {producto.apellido}</p>
                        {role === 'cliente' ? <>
                            <button id='botonProponer' className="btn btn-success"> Proponer intercambio </button>
                        </> : <> </>}
                    </div>
                </div>
            </div>
        </>
    )
}
