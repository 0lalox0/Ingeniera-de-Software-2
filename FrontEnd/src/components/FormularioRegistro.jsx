import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const FormularioRegistro = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('')

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Las contraseñas no coinciden');
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/productos');
        } catch (e) {
            setError(e.message);
        }
    }

    function redirectInicioSesion() {
        navigate("/inicioSesion");
    }

    return (
        <div className='formularioRegistro'>
            {error && <p className='error'>{error}</p>}
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Mail</label>

                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder='ejemplo123@gmail.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    type="password"
                    placeholder='Repetir contraseña'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} />
            </div>
                <button className="btn btn-primary" onClick={createAccount}>Crear cuenta</button>

            <p>¿Ya estás registrado?</p>
            <button className='botonesInicioSesion btn-primary' onClick={redirectInicioSesion}>
                Iniciar sesión
            </button>
        </div>
    )
}
