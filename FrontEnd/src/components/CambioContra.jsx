import React from 'react';
import { useState } from 'react';

export const CambioContra = () => {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const olvidoContra = async () => {
        try {
            await sendPasswordResetEmail(getAuth(), email);
        } catch (e) {
            setError(e.message);
        }
    }

    return (
        <div className='cambioContra'>
            <h3> Cambiar contraseña</h3>
            <label className='form-label'> Ingresá mail: </label>
            <input type="email" placeholder='ejemplo123@gmail.com' className="form-control" value={email}
                onChange={e => setEmail(e.target.value)} />
            <button className='search-button' onClick={olvidoContra}> Cambiar contraseña </button>
        </div>
    )
}
