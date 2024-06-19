import React from 'react'
import useUser from '../hooks/useUser';
import agregar from '../assets/agregar-sucursal.png';
import eliminar from '../assets/eliminar-sucursal.png';
import mover from '../assets/mover-empleado.png';
import { useNavigate } from 'react-router-dom';
import { Mantenimiento } from './Mantenimiento';
import CardComponent from './Card';

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
                <>
                    <div className='perfilUsuario'>
                        <h1 style={{ color: "#242465" }}> Administración de Sucursales de Ferreplus Intercambios</h1>
                        <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás gestionar todas las sucursales de Ferreplus intercambios.</p>
                    </div>

                    <div className='card-container'>

                        <CardComponent
                            title='Agregar sucursal'
                            paragraph='Acá vas a poder agregar una sucursal de Ferreplus.'
                            imageSrc={agregar}
                            onClick={redirectAgregarSucursal}
                        />

                        <CardComponent
                            title='Eliminar sucursal'
                            paragraph='Acá vas a poder eliminar una sucursal de Ferreplus.'
                            imageSrc={eliminar}
                            onClick={redirectEliminarSucursal}
                        />

                        <CardComponent
                            title='Asignar sucursal'
                            paragraph='Acá vas a poder asignarle una sucursal a un empleado de Ferreplus.'
                            imageSrc={mover}
                            onClick={redirectAsignarSucursal}
                        />

                    </div>

                    <p onClick={redirectAdmin} className='textoRedireccion'> Volver al panel administrativo</p>
                </>
                : <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}
