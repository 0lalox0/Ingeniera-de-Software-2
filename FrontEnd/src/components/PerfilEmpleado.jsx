import useUser from '../hooks/useUser';
import React, { useEffect, useState } from 'react'
import intercambio from '../assets/intercambio.png'
import { Mantenimiento } from './Mantenimiento';
import { useNavigate } from 'react-router-dom';

export const PerfilEmpleado = () => {
    const { role } = useUser();
    const [userInfo, setUserInfo] = useState('');

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

    const navigate = useNavigate();
    const redirectGestionPropuestas = () => navigate('/perfilEmpleado/propuestas');

    return (
        <>
            {role === 'empleado' ?
                <div className='perfilUsuario'>
                    
                    <h1 style={{ color: "#242465" }}> Bienvenido {userInfo.nombre}</h1>
                    <div className='card-container'>

                        <div className="card" onClick={redirectGestionPropuestas}>
                            <img src={intercambio} />
                            <div className="card-content">
                                <h3> Intercambios agendados</h3>
                                <p> Acá vas a poder confirmar intercambios exitosos.</p>
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