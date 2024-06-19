import React from 'react';
import agregar from '../assets/agregar-empleado.png';
import eliminar from '../assets/eliminar-empleado.png';
import mover from '../assets/mover-empleado.png';
import todos from '../assets/empleados.png';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { Mantenimiento } from './Mantenimiento';
import CardComponent from './Card';

export const GestionEmpleados = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const redirectAdmin = () => navigate('/admin');
    const redirectAgregarEmpleado = () => navigate('/admin/agregarEmpleado');
    const redirectEliminarEmpleado = () => navigate('/admin/eliminarEmpleado');
    const redirectAsignarSucursal = () => navigate('/admin/asignarSucursal');
    const redirectListarEmpleados = () => navigate('/admin/listarEmpleados');

    return (
        <>
            {role === 'admin' ?
                <>
                    <div className='perfilUsuario'>
                        <h1 style={{ color: "#242465" }}> Administración de Empleados de Ferreplus Intercambios</h1>
                        <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás gestionar a todos los empleados de Ferreplus Intercambios.</p>
                    </div>

                    <div className='card-container' >

                        <CardComponent 
                            title='Agregar empleado'
                            paragraph='Acá vas a poder agregar a un empleado al equipo de Ferreplus.'
                            imageSrc={agregar}
                            onClick={redirectAgregarEmpleado}
                        />

                        <CardComponent 
                            title='Eliminar empleado'
                            paragraph='Acá vas a poder eliminar un empleado del equipo de Ferreplus.'
                            imageSrc={eliminar}
                            onClick={redirectEliminarEmpleado}
                        />

                        <CardComponent 
                            title='Asignar sucursal'
                            paragraph='Acá vas a poder asignarle una sucursal a un empleado de Ferreplus.'
                            imageSrc={mover}
                            onClick={redirectAsignarSucursal}
                        />

                        <CardComponent 
                            title='Listar empleados'
                            paragraph='Acá vas a poder ver el listado de los empleados de Ferreplus.'
                            imageSrc={todos}
                            onClick={redirectListarEmpleados}
                        />

                    </div>
                    <p onClick={redirectAdmin} className='textoRedireccion'> Volver al panel administrativo</p>
                </>
                :
                <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}
