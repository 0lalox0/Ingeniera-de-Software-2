import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth as getFirebaseAuth } from 'firebase/auth';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';


//Segunda app de Firebase para crear usuarios
let secondaryApp;
if (!getApps().length) {
    secondaryApp = initializeApp({
        apiKey: "AIzaSyCSvOY3OQxoKZ2F2R2hCvlwEYSM66oL8fw",
        authDomain: "ing2-e821f.firebaseapp.com",
        projectId: "ing2-e821f",
        storageBucket: "ing2-e821f.appspot.com",
        messagingSenderId: "132789045631",
        appId: "1:132789045631:web:9a27776d872d9803c2324a"
    }, "secondary");
}

export const AgregarEmpleado = () => {

    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [sucursal, setSucursal] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [sucursales, setSucursales] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const authForCreatingUsers = getFirebaseAuth(secondaryApp);
    const { role } = useUser();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            registrarEmpleado();
        }
    };

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/sucursales');
                const data = await response.json();
                setSucursales(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSucursales();
    }, []);

    const chequeo = () => {
        if (!nombre) {
            setError('Se debe ingresar un nombre.');
            return false;
        }
        if (!apellido) {
            setError('Se debe ingresar un apellido.');
            return false;
        }
        if (!dni) {
            setError('Se debe ingresar el número dni.');
            return false;
        }
        if (!email) {
            setError('Se debe ingresar un email.');
            return false;
        }
        if (!telefono) {
            setError('Se debe ingresar un telefono.');
            return false;
        }
        if (!sucursal) {
            setError('Se debe elegir una sucursal.');
            return false;
        }
        if (!email.endsWith('ferreplus.com')) {
            setError('El email debe ser de Ferreplus.')
            return false;
        }
        if (!password) {
            setError('Se debe ingresar una contraseña.');
            return false;
        }
        if (!confirmPassword) {
            setError('Se debe confirmar la contraseña.');
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return false;
        }
        return true;
    }

    const limpiarFormulario = () => {
        setNombre('');
        setApellido('');
        setDni('');
        setEmail('');
        setTelefono('');
        setSucursal('');
        setPassword('');
        setConfirmPassword('');
        setError('');
    }

    const registrarEmpleado = async () => {
        if (chequeo()) {
            try {
                await createUserWithEmailAndPassword(authForCreatingUsers, email, password);
                try {
                    const response = await fetch('http://localhost:8000/api/empleados', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            nombre,
                            apellido,
                            dni,
                            email,
                            telefono,
                            sucursal
                        })
                    });
                    const data = await response.json();
                    setMessage("Empleado agregado con éxito!");
                    limpiarFormulario();
                } catch (error) {
                    console.log(error.message);
                    setMessage("Hubo un error al agregar al empleado a mongodb.");
                }
            } catch (e) {
                console.log(e.message);
                if (e.message.includes("(auth/weak-password)")) {
                    setError("Contraseña débil.");
                } else if (e.message.includes("(auth/email-already-in-use)")) {
                    setError("El email ingresado ya se encuentra registrado.");
                } else if (e.message.includes("(auth/invalid-email)")) {
                    setError("Email inválido.");
                } else {
                    setError("Error al crear la cuenta.");
                }
            }
        }
    }

    return (
        <>
            {role === 'admin' ?
                <div className='formularioRegistro' onKeyDown={handleKeyDown}>
                    <h3 style={{ color: "#242465" }}>
                        Registrar empleado:
                    </h3>

                    <div className="mb-3">
                        <label htmlFor='nombre' style={{ color: error === 'Se debe ingresar un nombre.' ? 'red' : 'black' }}> Nombre: </label>
                        <input className="form-control" type="text" placeholder='Juan' id='nombre' value={nombre} onChange={e => setNombre(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='apellido' style={{ color: error === 'Se debe ingresar un apellido.' ? 'red' : 'black' }}> Apellido: </label>
                        <input className="form-control" type="text" placeholder='Perez' id='apellido' value={apellido} onChange={e => setApellido(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dni" className="form-label" style={{ color: error === 'Se debe ingresar el número dni.' ? 'red' : 'black' }}>DNI:</label>
                        <input type="text" className="form-control" placeholder='33.333.333' id="dni" value={dni} onChange={e => setDni(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: error === 'Se debe ingresar un email.' || error === 'El email debe ser de Ferreplus.' ? 'red' : 'black' }}> Email: </label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ejemplo123@ferreplus.com' value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label" style={{ color: error === 'Se debe ingresar un telefono.' ? 'red' : 'black' }}>Teléfono:</label>
                        <input type="text" className="form-control" placeholder='221-5678758' id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sucursal" className="form-label">Sucursal:</label>
                        <select className="form-control" id="sucursal" value={sucursal} onChange={e => setSucursal(e.target.value)}>
                            <option value="">Seleccione una sucursal</option>
                            {sucursales.map((sucursal, index) => (
                                <option key={sucursal._id} value={sucursal._id}>{sucursal.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra1' style=
                            {{ color: error === 'Se debe ingresar una contraseña.' || error === 'Las contraseñas no coinciden.' ? 'red' : 'black' }}>
                            Contraseña:</label>
                        <input className="form-control" id="exampleInputPassword1" type="password" placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra2' style=
                            {{ color: error === 'Se debe confirmar la contraseña.' || error === 'Las contraseñas no coinciden.' ? 'red' : 'black' }}>
                            Confirmar contraseña:</label>
                        <input className="form-control" id="exampleInputPassword2" type="password" placeholder='Repetir contraseña' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <button className="btn btn-primary" onClick={registrarEmpleado}>Crear cuenta</button>

                    <p style={{ color: message === 'Empleado agregado con éxito!' ? 'green' : 'red' }}> {message} </p>

                    {error && <p className='errorContainer'>{error}</p>}
                </div>
                : <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}