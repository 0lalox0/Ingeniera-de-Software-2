import React, { useState, useEffect } from 'react'

export const ListarSucursales = () => {
    const [sucursales, setSucursales] = useState([]);

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await fetch('http://localhost:8000/sucursales');
                const data = await response.json();
                setSucursales(data);
            } catch (error) {
                console.error("Error al obtener las sucursales: ", error);
            }
        }

        fetchSucursales();
    }, []);

    return (
        <div>
            {sucursales.map(sucursal => (
                <div key={sucursal._id}>
                    <h2>{sucursal.nombre}</h2>
                    <p>{sucursal.ciudad}</p>
                    <p>{sucursal.calle}</p>
                    <p>{sucursal.numero}</p>
                    <p>{sucursal.horarioApertura}</p>
                    <p>{sucursal.horarioCierre}</p>
                </div>
            ))}
        </div>
    )
}