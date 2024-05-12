import React from 'react';
import { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export const CambioContra = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const olvidoContra = async () => {
        if (email == '') {
            setError('Por favor, ingrese un email.');
            return;
        }
        try {
            await sendPasswordResetEmail(getAuth(), email);
            //si se cambio la contraseña, hay que actualizar la base de datos
            
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className='cambioContra'>
            <h3> Cambiar contraseña</h3>
            <label className='form-label' htmlFor='inputEmailCambio' style={{
                color: error.includes('Por favor, ingrese un email.') ? 'red' : 'black'
            }}> Ingresá mail: </label>
            <input type="email" placeholder='ejemplo123@gmail.com' className="form-control" value={email}
                onChange={e => setEmail(e.target.value)} id='inputEmailCambio' />
            <button className='search-button' onClick={olvidoContra}> Cambiar contraseña </button>
            {error && <p className='errorContainer'> {error} </p>}
        </div>
    )
}
