import React, { useEffect, useState } from 'react'
import useUser from '../hooks/useUser';
import userIcon from '../assets/user-icon.png'
import productos from '../assets/productos.png'
import intercambio from '../assets/intercambio.png'
import { Mantenimiento } from './Mantenimiento';

export const PerfilUsuario = () => {
    const { role, user } = useUser();

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

    return (
        <>
            {role === 'cliente' ?
                <div className='perfilUsuario'>
                    <h1 style={{ color: "#242465" }}> Bienvenido a tu perfil, {userInfo.name}</h1>
                    <p id='textoInfoPerfil' style={{ color: "#242465" }}> Acá podrás gestionar toda tu información relacionada a Ferreplus Intercambios.</p>
                    <div className='card-container'>
                        <div className="card">
                            <img src={userIcon} alt="" />
                            <div className="card-content">
                                <h3> Mis datos</h3>
                                <p> Acá vas a poder ver y modificar tus datos. </p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={productos} alt="" />
                            <div className="card-content">
                                <h3> Mis productos</h3>
                                <p> Acá vas a poder ver toda la información relacionada con tus productos.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={intercambio} alt="" />
                            <div className="card-content">
                                <h3> Mis intercambios</h3>
                                <p> Acá vas a poder toda la información relacionada con tus intercambios.</p>
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
