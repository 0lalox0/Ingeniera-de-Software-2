import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import { useNavigate } from 'react-router-dom';

export const ProductoIntercambio = () => {
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = useParams().id;
    const navigate = useNavigate();

    const redirectIntercambios = () => navigate('/intercambios');

    useEffect(() => {
        fetch(`http://localhost:8000/api/prodintercambios/${id}`)
            .then(response => response.json())
            .then(data => { setProducto(data); setLoading(false) })
            .catch(error => console.error('Error:', error));
    }, []);

    if (loading)
        return <img src={cargando} width='10%' height='10%' />

    return (
        <>
            <div className="ver-intercambio">
                <h2> {producto.titulo} </h2>
                <p className="textoRedireccion" onClick={redirectIntercambios}> Volver a los productos para intercambiar</p>
                {
                    producto.urlFotos.length > 1 ?
                     <div className='carrousel'>
                        <div id="carouselExampleIndicators" class="carousel slide">
                            <div class="carousel-indicators">
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                            </div>
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={producto.urlFotos[0]} class="d-block w-100" width='10px' height='10px' />
                                </div>
                                <div class="carousel-item">
                                    <img src={producto.urlFotos[1]} class="d-block w-100" width='10px' height='10px' />
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                     </div>
                        : <img src={producto.urlFotos[0]} />
                }
                <p> {producto.descripcion} </p>
                <p> {producto.sucursalNombre} </p>
            </div>
        </>
    )
}
