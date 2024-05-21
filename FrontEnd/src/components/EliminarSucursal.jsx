import React, { useState, useEffect, useRef } from 'react';
import { Mantenimiento } from './Mantenimiento';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';


export const EliminarSucursal = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [sucursales, setSucursales] = useState([]);
    const [eliminar, setEliminar] = useState(false);
    const [mensajeEliminar, setMensajeEliminar] = useState('');
    const refMensaje = useRef(null);

    const redirectSucursales = () => navigate('/admin/sucursales');

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const encontrarSucursal = (idSucursal) => {
        return sucursales.find(s => s._id === idSucursal);
    }

    const botonEliminar = (sucursalId) => {
        setEliminar(sucursalId);
        setMensajeEliminar('¿Estás seguro de querer borrar esta sucursal?');
        refMensaje.current.style.color = 'red';
    }

    const botonConfirmar = async (sucursalId) => {
        setEliminar(null);
        refMensaje.current.style.color = 'red';
        let sucursalEliminar = encontrarSucursal(sucursalId);
        try {
            const url = `http://localhost:8000/api/sucursales/${sucursalId}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const response = await fetch(url, options);
            if (!response.ok) 
                throw new Error('No se pudo eliminar la sucursal');
        } catch {
            setMensajeEliminar('Hubo un error al intentar eliminar la sucursal.');
            return;
        }
        setSucursales(sucursales.filter(sucursal => sucursal._id !== sucursalId));
        setMensajeEliminar(`Se eliminó la sucursal con nombre ${sucursalEliminar.nombre}, ubicada en la calle ${sucursalEliminar.calle} número ${sucursalEliminar.numero} de la ciudad ${sucursalEliminar.ciudad}.`);
    };

    const botonCancelar = () => {
        setEliminar(null);
        setMensajeEliminar('No se ha borrado la sucursal.');
        refMensaje.current.style.color = 'black';
    }

    return (
        <>
            {role === 'admin' ?
                <>
                    <div className='eliminacion-sucursales'>
                        <h1 style={{ color: "#242465" }}> Eliminar sucursal de Ferreplus </h1>
                        <p className='textoRedireccion' onClick={redirectSucursales}> Volver a la gestión de sucursales</p>
                        <p ref={refMensaje}> {mensajeEliminar}</p>
                    </div>
                    <div className='clase-sucursales'>
                        <table className="table table-hover align-middle " id='tablaSucursalesEliminar'>
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
                                            <td>{sucursal.numero}</td>
                                            <td>{sucursal.calle}</td>
                                            <td>{isNaN(horarioApertura) ? 'Invalid date' : horarioApertura.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>{isNaN(horarioCierre) ? 'Invalid date' : horarioCierre.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                            <td>
                                                {eliminar === sucursal._id ? (
                                                    <>
                                                        <button onClick={() => botonConfirmar(sucursal._id)} className='botonEliminar'>Confirmar</button>
                                                        <button onClick={botonCancelar}>Cancelar</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => botonEliminar(sucursal._id)} className='botonEliminar'>Eliminar sucursal</button>
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
