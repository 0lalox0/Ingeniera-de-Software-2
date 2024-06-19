import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CardIntercambio = ({ id, imageSrc, titulo, sucursal, categoria, nombre, apellido }) => {
    const navigate = useNavigate();
    const redirectProducto = (idProducto) => navigate(`/intercambios/${idProducto}`);

    return (
        <div className="card mb-3" key={id} onClick={() => redirectProducto(id)}>
            <div className="row g-0">
                <div className="col-md-4">
                    <img src={imageSrc} className="img-fluid rounded-start" />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{titulo}</h5>
                        <p className="card-text"> Sucursal del intercambio: {sucursal}</p>
                        <p className="card-text"> Categoría: {categoria}.</p>
                        <p style={{ color: '#439ac8' }}> Hacé click para obtener más información.</p>
                        <p className="card-text"><small className="text-body-secondary">Publicado por: {nombre} {apellido}</small></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
