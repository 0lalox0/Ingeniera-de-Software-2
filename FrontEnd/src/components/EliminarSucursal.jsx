import React, { useState, useEffect } from 'react';
import { Mantenimiento } from './Mantenimiento';
import useUser from '../hooks/useUser';


export const EliminarSucursal = () => {
    const { role } = useUser();
    const [sucursales, setSucursales] = useState([]);
    const [confirmDelete, setConfirmDelete] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleDeleteClick = (sucursalId) => setConfirmDelete(sucursalId);

    const handleConfirmClick = (sucursalId) => {
        console.log(`Eliminar sucursal con ID: ${sucursalId}`);
        setConfirmDelete(null);
    };

    const handleCancelClick = () => setConfirmDelete(null);

    return (
        <>
            {role === 'admin' ?
                <>
                    <div className='clase-sucursales'>
                        <div className='titulo-sucursales'>
                            <h1 style={{ color: "#242465" }}>Eliminar sucursal de Ferreplus</h1>
                        </div>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th style={{ color: "#242465" }} scope="col">Nombre</th>
                                    <th style={{ color: "#242465" }} scope="col">Ciudad</th>
                                    <th style={{ color: "#242465" }} scope="col">Número</th>
                                    <th style={{ color: "#242465" }} scope="col">Calle</th>
                                    <th style={{ color: "#242465" }} scope="col">Horario de Apertura</th>
                                    <th style={{ color: "#242465" }} scope="col">Horario de Cierre</th>
                                    <th style={{ color: "#242465" }} scope="col">Gestionar</th>
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
                                            <td>{sucursal.calle}</td>
                                            <td>{sucursal.numero}</td>
                                            <td>{isNaN(horarioApertura) ? 'Invalid date' : horarioApertura.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{isNaN(horarioCierre) ? 'Invalid date' : horarioCierre.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>
                                                {confirmDelete === sucursal._id ? (
                                                    <>
                                                        <button onClick={() => handleConfirmClick(sucursal._id)}>Confirmar</button>
                                                        <button onClick={handleCancelClick}>Cancelar</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => handleDeleteClick(sucursal._id)}>Eliminar sucursal</button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
                : <Mantenimiento> </Mantenimiento>}
        </>
    )
}
