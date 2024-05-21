import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const ProductoIntercambio = () => {
    const [producto, setProducto] = useState(null);
    const id = useParams().id;

    useEffect(() => {
        fetch(`http://localhost:8000/api/prodintercambios/${id}`)
            .then(response => response.json())
            .then(data =>  setProducto(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div>ProductoIntercambio
            Titulo: {producto.titulo}
        </div>
    )
}
