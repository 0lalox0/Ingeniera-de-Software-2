import React from 'react'
import { useNavigate } from 'react-router-dom';

export const FormularioRegistro = () => {

    const navigate = useNavigate();

    function redirectInicioSesion() {
        navigate("/inicioSesion");
    }

    return (
        <div className='formularioRegistro'>
            <h1>Aca va el registro </h1>
            <p>hola</p>

            <p>¿Ya estás registrado?</p>
            <button className='botonesInicioSesion btn-primary' onClick={redirectInicioSesion}>
                Iniciar sesión
            </button>
        </div>
    )
}
