import React, { useState, useEffect } from 'react'

export const Sucursales = () => {
    const [sucursales, setSucursales] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className='clase-sucursales'>
            <div className='titulo-sucursales'>
                <h1 style={{ color: "#242465" }}>Sucursales de Ferreplus</h1>
                <p style={{ color: "#242465" }}> ¡Conocé las sucursales de Ferreplus!</p>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Ciudad</th>
                        <th>Calle</th>
                        <th>Número</th>
                        <th>Horario de Apertura</th>
                        <th>Horario de Cierre</th>
                    </tr>
                </thead>
                <tbody>
                    {sucursales.map((sucursal) => {
                        const horarioApertura = new Date(sucursal.horarioApertura);
                        const horarioCierre = new Date(sucursal.horarioCierre);

                        return (
                            <tr key={sucursal._id}>
                                <td>{sucursal.nombre}</td>
                                <td>{sucursal.ciudad}</td>
                                <td>{sucursal.calle}</td>
                                <td>{sucursal.numero}</td>
                                <td>{isNaN(horarioApertura) ? 'Invalid date' : horarioApertura.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                <td>{isNaN(horarioCierre) ? 'Invalid date' : horarioCierre.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}
