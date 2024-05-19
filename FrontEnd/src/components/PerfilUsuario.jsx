import React, { useEffect, useState } from 'react'
import useUser from '../hooks/useUser';
import userIcon from '../assets/user-icon.png'
import productos from '../assets/productos.png'
import intercambio from '../assets/intercambio.png'
import passIcon from '../assets/pass-icon.png'
import { Mantenimiento } from './Mantenimiento';
import { useNavigate } from 'react-router-dom';

export const PerfilUsuario = () => {
    const { role } = useUser();

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
    const navigate = useNavigate();
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

                        <div className="card">
                            <img src={productos} />
                            <div className="card-content">
                                <h3> Mis productos</h3>
                                <p> Acá vas a poder ver toda la información relacionada con tus productos.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={intercambio} onClick={redirectGestionIntercambios}/>
                            <div className="card-content">
                                <h3> Mis intercambios</h3>
                                <p> Acá vas a poder toda la información relacionada con tus intercambios.</p>
                            </div>
                        </div>

                        <div className="card" onClick={redirectEditarPerfil}>
                            <img src={userIcon} />
                            <div className="card-content">
                                <h3> Mis datos</h3>
                                <p> Acá vas a poder ver y modificar tus datos. </p>
                            </div>
                        </div>

                        <div className="card" onClick={redirectCambioContraSinEmail}>
                            <img src={passIcon} alt="" />
                            <div className="card-content">
                                <h3> Cambiar contraseña</h3>
                                <p> Acá vas a poder modificar tu contraseña. </p>
                            </div>
                        </div>

                    </div>
                </div>
                :
                <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}
