import React, { useEffect, useState } from 'react'
import useUser from '../hooks/useUser';
import userIcon from '../assets/user-icon.png'
import productos from '../assets/productos.png'
import intercambio from '../assets/intercambio.png'
import passIcon from '../assets/pass-icon.png'
import { Mantenimiento } from './Mantenimiento';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';

export const PerfilUsuario = () => {
    const { role } = useUser();
    const navigate = useNavigate();

    const [userInfo, setUserInfo] = useState('');
    let e = localStorage.getItem("email");
    let t = "http://localhost:8000/api/users/" + e
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

    const redirectCambioContraSinEmail = () => navigate('/cambiocontrasinemail');
    
    const redirectEditarPerfil = () => navigate('/editarPerfil');
    
    const redirectGestionIntercambios = () => navigate('/perfilUsuario/intercambios');

    return (
        <>
            {role === 'cliente' ?
                <div className='perfilUsuario'>
                    <h1 style={{ color: "#242465" }}> Bienvenido a tu perfil, {userInfo.name}</h1>
                    <p id='textoInfoPerfil' style={{ color: "#242465" }}> Acá podrás gestionar toda tu información relacionada a Ferreplus Intercambios.</p>
                    <div className='card-container'>

                        <CardComponent 
                            title='Mis productos'
                            paragraph='Acá vas a poder ver toda la información relacionada con tus productos.'
                            imageSrc={productos}
                        />

                        <CardComponent 
                            title='Mis intercambios'
                            paragraph='Acá vas a poder toda la información relacionada con tus intercambios.'
                            imageSrc={intercambio}
                            onClick={redirectGestionIntercambios}
                        />

                        <CardComponent 
                            title='Mis datos'
                            paragraph='Acá vas a poder ver y modificar tus datos.'
                            imageSrc={userIcon}
                            onClick={redirectEditarPerfil}
                        />

                        <CardComponent 
                            title='Cambiar contraseña'
                            paragraph='Acá vas a poder modificar tu contraseña.'
                            imageSrc={passIcon}
                            onClick={redirectCambioContraSinEmail}
                        />

                    </div>
                </div>
                :
                <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}
