import useUser from '../hooks/useUser';
import React, { useEffect, useState } from 'react';
import intercambio from '../assets/intercambio.png';
import { Mantenimiento } from './Mantenimiento';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';

export const PerfilEmpleado = () => {
    const { role } = useUser();
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();

    let e = localStorage.getItem("email");
    let t = "http://localhost:8000/api/empleados/" + e
    useEffect(() => {
        buscarNombre();
    }, []);

    const buscarNombre = () => {
        fetch(t).then(response => {
            return response.json()
        }).then(data => {
            setUserInfo(data);
        })
    }

    const redirectGestionPropuestas = () => navigate('/perfilEmpleado/propuestas');

    return (
        <>
            {role === 'empleado' ?
                <div className='perfilUsuario'>
                    <h1 style={{ color: "#242465" }}> Gestión de Ferreplus Intercambios</h1>
                    <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como empleado de Ferreplus, podrás gestionar los intercambios aceptados por los usuarios.</p>

                    <div className='card-container'>

                        <CardComponent
                            title='Gestionar intercambios'
                            paragraph='Acá vas a poder confirmar o cancelar intercambios aceptados por los usuarios de Ferreplus Intercambios.'
                            imageSrc={intercambio}
                            onClick={redirectGestionPropuestas}
                        />

                    </div>
                </div>
                :
                <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}