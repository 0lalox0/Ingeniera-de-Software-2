import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const CambioContra = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [cambiar, setCambiar] = useState('true');
    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            olvidoContra();
        }
    };

    const redirectInicioSesion = () => navigate('/inicioSesion');

    const olvidoContra = async () => {
        if (email == '') {
            setError('Por favor, ingrese un email.');
            return;
        }
        try {
            await sendPasswordResetEmail(getAuth(), email); //si se cambio la contraseña, hay que actualizar la base de datos
            setCambiar(false);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className='cambioContra' onKeyDown={handleKeyDown}>
            {cambiar ? (
                <>
                    <h2> Cambiar contraseña</h2>
                    <label className='form-label' htmlFor='inputEmailCambio' style={{ color: error.includes('Por favor, ingrese un email.') ? 'red' : 'black' }}> Ingresá mail: </label>
                    <input type="email" placeholder='ejemplo123@gmail.com' className="form-control" value={email} onChange={e => setEmail(e.target.value)} id='inputEmailCambio' />
                    <button className='search-button' onClick={olvidoContra}> Cambiar contraseña </button>
                    {error && <p className='errorContainer'> {error} </p>}
                </>
            )
                : <>
                    <div className='mensajeExito'>
                        <h2 style={{ color: "#242465" }}> ¡Listo!</h2>
                        <p> Un correo electrónico ha sido enviado a {email}. Seguí los pasos para poder cambiar tu contraseña.</p>
                        <p className='textoRedireccion' onClick={redirectInicioSesion}> Volver a iniciar sesión </p>
                    </div>
                </>
            }
        </div>
    )
}
