import React from 'react'
import useUser from '../hooks/useUser';
import agregar from '../assets/agregar-sucursal.png';
import eliminar from '../assets/eliminar-sucursal.png';
import mover from '../assets/mover-empleado.png';
import { useNavigate } from 'react-router-dom';
import { Mantenimiento } from './Mantenimiento';

export const GestionSucursales = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const redirectAgregarSucursal = () => navigate('/admin/agregarSucursal');
    const redirectEliminarSucursal = () => navigate('/admin/eliminarSucursal');
    const redirectAsignarSucursal = () => navigate('/admin/asignarSucursal');
    const redirectAdmin = () => navigate('/admin');

    return (
        <>
            {role === 'admin' ?
                <div className='perfilUsuario'>
                    <h1 style={{ color: "#242465" }}> Administración de Sucursales de Ferreplus Intercambios</h1>
                    <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás gestionar todas las sucursales de Ferreplus intercambios.</p>

                    <div className='card-container' id='cardAdministrador'>
                        <div className="card" onClick={redirectAgregarSucursal}>
                            <img src={agregar} />
                            <div className="card-content">
                                <h3> Agregar sucursal</h3>
                                <p> Acá vas a poder agregar una sucursal de Ferreplus.</p>
                            </div>
                        </div>

                        <div className="card" onClick={redirectEliminarSucursal}>
                            <img src={eliminar} />
                            <div className="card-content">
                                <h3> Eliminar sucursal</h3>
                                <p> Acá vas a poder eliminar una sucursal de Ferreplus.</p>
                            </div>
                        </div>

                        <div className="card" onClick={redirectAsignarSucursal}>
                            <img src={mover} />
                            <div className="card-content">
                                <h3> Asignar sucursal </h3>
                                <p> Acá vas a poder asignarle una sucursal a un empleado de Ferreplus.</p>
                            </div>
                        </div>

                    </div>
                    <p onClick={redirectAdmin} className='textoRedireccion'> Volver al panel administrativo</p>
                </div>
                :
                <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}
