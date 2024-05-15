import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export const FormularioRegistro = () => {

    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [date, setDate] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const clear = () => ['labelContra1', 'labelContra2', 'labelFecha'].forEach(element => document.getElementById(element).className = '');

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

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            createAccount();
        }
    };

    const createAccount = async () => {
        clear();
        if (name == '') {
            setError('Se debe ingresar un nombre.');
            return;
        }
        if (surname == '') {
            setError('Se debe ingresar un apellido.');
            return;
        }
        if (!date) {
            setError('Se debe seleccionar una fecha.');
            return;
        }
        if (!checkDate()) {
            setError('Se debe ser mayor de 18 años para poder registrarse.');
            return;
        }
        if (email == '') {
            setError('Se debe ingresar un mail.');
            return;
        }
        if (email.endsWith('@admin.ferreplus.com') || email.endsWith('@ferreplus.com')) {
            setError('No se pueden usar emails de Ferreplus.')
            return;
        }
        if (password == '') {
            setError('Se debe ingresar una contraseña.');
            return;
        }
        if (confirmPassword == '') {
            setError('Se debe confirmar la contraseña.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
        try {
            await createUserWithEmailAndPassword(getAuth(), email, password);
            navigate('/productos');
            localStorage.setItem("email", email);
            //si se crea la cuenta, hay que guardar la info en mongodb
            try {
                const response = await fetch('http://localhost:8000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name,
                        lastname: surname,
                        email,
                        date
                    })
                });
                const data = await response.json();
                console.log(data);
                setMessage("Usuario agregado con éxito!");
            } catch (error) {
                setMessage("Hubo un error al agregar al usuario a mongodb.");
            }
        } catch (e) {
            setError(e.message);
        }
    }

    const redirectInicioSesion = () => navigate('/inicioSesion');

    return (
        <div className='formularioRegistro' onKeyDown={handleKeyDown}>

            <h3 style={{ color: "#242465" }}>
                ¡Registrate en Ferreplus Intercambios!
            </h3>

            <div className="mb-3">
                <label htmlFor='nombre' style={{ color: error === 'Se debe ingresar un nombre.' ? 'red' : 'black' }}> Nombre completo: </label>
                <input className="form-control" type="text" placeholder='Juan' id='nombre' value={name} onChange={e => setName(e.target.value)} onKeyDown={handleKeyDown} />
            </div>

            <div className="mb-3">
                <label htmlFor='apellido' style={{ color: error === 'Se debe ingresar un apellido.' ? 'red' : 'black' }}> Apellido: </label>
                <input className="form-control" type="text" placeholder='Perez' id='apellido' value={surname} onChange={e => setSurname(e.target.value)} onKeyDown={handleKeyDown} />
            </div>

            <div className="mb-3">
                <label id='labelFecha' htmlFor='fechaNacimiento' style=
                    {{ color: error === 'Se debe seleccionar una fecha.' || error === 'Se debe ser mayor de 18 años para poder registrarse.' ? 'red' : 'black' }}>
                    Fecha de nacimiento: </label>
                <input className="form-control" type="date" id='fechaNacimiento' value={date} onChange={e => setDate(e.target.value)} onKeyDown={handleKeyDown} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: error === 'Se debe ingresar un mail.' || error === 'No se pueden usar emails de Ferreplus.' ? 'red' : 'black' }}> Mail: </label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder='ejemplo123@gmail.com'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra1' style=
                    {{ color: error === 'Se debe ingresar una contraseña.' || error === 'Las contraseñas no coinciden.' ? 'red' : 'black' }}>
                    Contraseña:</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown} />
            </div>

            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra2' style=
                    {{ color: error === 'Se debe confirmar la contraseña.' || error === 'Las contraseñas no coinciden.' ? 'red' : 'black' }}>
                    Confirmar contraseña:</label>
                <input
                    className="form-control"
                    id="exampleInputPassword2"
                    type="password"
                    placeholder='Repetir contraseña'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    onKeyDown={handleKeyDown} />
            </div>

            <button className="btn btn-primary" onClick={createAccount}>Crear cuenta</button>

            {error && <p className='errorContainer'>{error}</p>}

            <p onClick={redirectInicioSesion} className='textoRedireccion'> ¿Ya estás registrado? Iniciar sesión </p>
        </div >
    )
}
