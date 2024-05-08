import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const FormularioRegistro = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const clear = () => {
        ['labelContra1', 'labelContra2', 'labelFecha'].forEach(element => document.getElementById(element).className = '');
    }

    const checkDate = () => { // funcion para chequear si es mayor de edad
        const valorFecha = document.getElementById('fechaNacimiento').value;
        const fechaNacimiento = new Date(valorFecha);
        const fechaActual = new Date();
        let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate()))
            edad--;
        return edad >= 18;
    }

    const createAccount = async () => {
        let labelContra1 = document.getElementById('labelContra1');
        let labelContra2 = document.getElementById('labelContra2');
        let labelFecha = document.getElementById('labelFecha');
        let mensajeError = document.createElement('p');
        clear();
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            labelContra1.className = 'errorContainer';
            labelContra2.className = 'errorContainer';
            return;
        }
        if (!checkDate()) {
            setError('Se debe ser mayor de 18 años para poder registrarse.');
            labelFecha.className = 'errorContainer';
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/productos');
        } catch (e) {
            mensajeError.innerHTML = 'Error de base de datos';
            setError(e.message);
        }
    }

    const redirectInicioSesion = () => {
        navigate("/inicioSesion");
    }

    return (
        <div className='formularioRegistro'>

            <h3>
                ¡Registrate en Ferreplus Intercambios!
            </h3>

            <div className="mb-3">
                <label htmlFor='nombre'> Nombre completo: </label>
                <input className="form-control" type="text" placeholder='Juan' id='nombre' />
            </div>

            <div className="mb-3">
                <label htmlFor='apellido'> Apellido: </label>
                <input className="form-control" type="text" placeholder='Perez' id='apellido' />
            </div>

            <div className="mb-3">
                <label id='labelFecha' htmlFor='fechaNacimiento'> Fecha de nacimiento: </label>
                <input className="form-control" type="date" id='fechaNacimiento' />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label"> Mail: </label>
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
                <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra1'>Contraseña:</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra2'>Confirmar contraseña:</label>
                <input
                    className="form-control"
                    id="exampleInputPassword2"
                    type="password"
                    placeholder='Repetir contraseña'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} />
            </div>

            <button className="btn btn-primary" onClick={createAccount}>Crear cuenta</button>

            {error && <p className='errorContainer'>{error}</p>}

            <p onClick={redirectInicioSesion} className='textoRedireccion'>
                ¿Ya estás registrado? Iniciar sesión
            </p>
        </div >
    )
}
