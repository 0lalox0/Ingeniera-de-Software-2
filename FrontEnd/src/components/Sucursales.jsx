import React from 'react'

export const Sucursales = () => {
    const sucursales = [
        { id: 1, nombre: 'Sucursal La Plata', ciudad: 'La Plata', calle: 'Calle 9', numero: 45, horarioApertura: new Date('2024-1-1-08:00:00'), horarioCierre: new Date('2024-1-1-20:00:00') },
        { id: 2, nombre: 'Sucursal San Lorenzo', ciudad: 'Almagro', calle: 'Avenida Almagro', numero: 713, horarioApertura: new Date('2024-1-1-08:00:00'), horarioCierre: new Date('2024-1-1-20:00:00') },
        { id: 3, nombre: 'Sucursal Palermo', ciudad: 'Ciudad Autónoma de Buenos Aires', calle: '9 de Julio', numero: 123, horarioApertura: new Date('2024-1-1-07:00:00'), horarioCierre: new Date('2024-1-1-22:30:00') },
        { id: 4, nombre: 'Sucursal Lanús', ciudad: 'Lanús', calle: 'Calle Lincoln', numero: 329, horarioApertura: new Date('2024-1-1-10:00:00'), horarioCierre: new Date('2024-1-1-23:15:00') }
    ];

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
                    {sucursales.map((sucursal) => (
                        <tr key={sucursal.id}>
                            <td>{sucursal.nombre}</td>
                            <td>{sucursal.ciudad}</td>
                            <td>{sucursal.calle}</td>
                            <td>{sucursal.numero}</td>
                            <td>{sucursal.horarioApertura.getHours()}:{sucursal.horarioApertura.getMinutes().toString().padStart(2, '0')}</td>
                            <td>{sucursal.horarioCierre.getHours()}:{sucursal.horarioCierre.getMinutes().toString().padStart(2, '0')}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
