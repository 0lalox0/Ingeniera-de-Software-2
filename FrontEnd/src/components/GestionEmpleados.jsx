import React from 'react';
import agregar from '../assets/agregar-empleado.png';
import eliminar from '../assets/eliminar-empleado.png';
import mover from '../assets/mover-empleado.png';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { Mantenimiento } from './Mantenimiento';

export const GestionEmpleados = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const redirectAdmin = () => navigate('/admin');
    const redirectAgregarEmpleado = () => navigate('/admin/agregarEmpleado');

    return (
        <>
            {role === 'admin' ?
                <div className='perfilUsuario'>
                    <h1 style={{ color: "#242465" }}> Administración de Empleados de Ferreplus Intercambios</h1>
                    <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás gestionar a todos los empleados de Ferreplus Intercambios.</p>

                    <div className='card-container' id='cardAdministrador' onClick={redirectAgregarEmpleado}>
                        <div className="card">
                            <img src={agregar} alt="" />
                            <div className="card-content">
                                <h3> Agregar empleado</h3>
                                <p> Acá vas a poder agregar a un empleado al equipo de Ferreplus.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={eliminar} alt="" />
                            <div className="card-content">
                                <h3> Eliminar empleado</h3>
                                <p> Acá vas a poder eliminar un empleado del equipo de Ferreplus.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={mover} alt="" />
                            <div className="card-content">
                                <h3> Asignar sucural </h3>
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
