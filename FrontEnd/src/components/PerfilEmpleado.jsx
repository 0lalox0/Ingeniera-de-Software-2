import useUser from '../hooks/useUser';
import React, { useEffect, useState } from 'react';
import compras from '../assets/compras.png';
import intercambio from '../assets/intercambio.png';
import { Mantenimiento } from './Mantenimiento';
import { useNavigate } from 'react-router-dom';

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
                        <div className="card" onClick={redirectGestionPropuestas}>
                            <img src={intercambio} />
                            <div className="card-content">
                                <h3> Gestionar intercambios</h3>
                                <p> Acá vas a poder confirmar o cancelar intercambios aceptados por los usuarios de Ferreplus Intercambios.</p>
                            </div>
                        </div>

                        <div className="card">
                            <img src={compras} />
                            <div className="card-content">
                                <h3> Gestionar compras </h3>
                                <p> Acá vas a poder confirmar o cancelar las compras realizadas por los usuarios de Ferreplus Intercambios.</p>
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
/*
<div className='perfilUsuario'>
                    <h1 style={{ color: "#242465" }}> Bienvenido {userInfo.nombre}</h1>
                    <p id='textoInfoPerfil' style={{ color: "#242465" }}> Acá podrás gestionar toda tu información relacionada a Ferreplus Intercambios.</p>
                    
                    <div className='card-container'>
                        <div className="card" onClick={redirectGestionPropuestas}>
                            <img src={intercambio} />
                            <div className="card-content">
                                <h3> Intercambios agendados</h3>
                                <p> Acá vas a poder confirmar p cancelar intercambios aceptador por los usuarios de Ferreplus.</p>
                            </div>
                        </div>
                    </div>
                    
                </div>
*/