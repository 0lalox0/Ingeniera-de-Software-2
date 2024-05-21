import React, { useEffect, useState } from 'react';
import useUser from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';

export const Intercambios = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [intercambios, setIntercambios] = useState([]);

    const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');

    const redirectProducto = (idProducto) => navigate(`/intercambios/${idProducto}`);

    useEffect(() => {
        fetch('http://localhost:8000/api/prodintercambios')
            .then(response => response.json())
            .then(data => setIntercambios(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className='clase-intercambios'>
            <div className='titulo-intercambios'>
                <h1 style={{ color: "#242465" }}>Productos para intercambiar</h1>
                <>
                    {role === 'cliente' ?
                        <>
                            <button onClick={redirectAgregar} className="btn btn-success"> Publicar producto para intercambiar</button>
                        </>
                        : <>
                        </>}
                </>
                <div className="intercambios">
                    {intercambios.map((intercambio) => {
                        return (
                            <div className="card mb-3" key={intercambio._id} onClick={() => redirectProducto(intercambio._id)}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={intercambio.urlFotos[0]} className="img-fluid rounded-start" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{intercambio.titulo}</h5>
                                            <p className="card-text">Descripción del producto: {intercambio.descripcion}.
                                                Sucursal del intercambio: {intercambio.nombreSucursal}
                                                Rango horario: {intercambio.inicioRango} - {intercambio.finRango}</p>
                                            <p className="card-text"><small className="text-body-secondary">Publicado por: {intercambio.nombre} {intercambio.apellido} </small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
