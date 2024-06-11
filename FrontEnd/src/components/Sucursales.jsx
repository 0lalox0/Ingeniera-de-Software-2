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
            <div className='titulos titulo-sucursales'>
                <h1> Sucursales de Ferreplus</h1>
                <p style={{ color: "#242465" }}> ¡Conocé las sucursales de Ferreplus! Todas nuestras sucursales están abiertas de lunes a viernes en sus horarios correspondientes.</p>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Ciudad</th>
                        <th scope="col">Número</th>
                        <th scope="col">Calle</th>
                        <th scope="col">Horario de Apertura</th>
                        <th scope="col">Horario de Cierre</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {sucursales.map((sucursal) => {
                        const horarioApertura = new Date(sucursal.horarioApertura);
                        const horarioCierre = new Date(sucursal.horarioCierre);
                        return (
                            <tr key={sucursal._id}>
                                <td>{sucursal.nombre}</td>
                                <td>{sucursal.ciudad}</td>
                                <td>{sucursal.numero}</td>
                                <td>{sucursal.calle}</td>
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
