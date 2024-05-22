import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import cargando from '../assets/cargando.gif';
import { useNavigate } from 'react-router-dom';
import useUser from "../hooks/useUser";

export const ProductoIntercambio = () => {
    const { role } = useUser();
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
                <div className="intercambio-contenido">
                    <div className="intercambio-fotos">
                        {
                            producto.urlFotos.length > 1 ?
                                <>
                                    <img src={producto.urlFotos[0]} />
                                    <img src={producto.urlFotos[1]} />
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
