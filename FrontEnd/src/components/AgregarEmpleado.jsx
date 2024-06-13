import { useState, useEffect, useRef } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth as getFirebaseAuth } from 'firebase/auth';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import { useNavigate } from 'react-router-dom';

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
    const { role } = useUser();
    const navigate = useNavigate();
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
    const refMensaje = useRef(null);
    const refNombre = useRef(null);
    const refApellido = useRef(null);
    const refDNI = useRef(null);
    const refEmail = useRef(null);
    const refTelefono = useRef(null);
    const refSucursal = useRef(null);
    const refContra = useRef(null);
    const refConfirm = useRef(null);

    const redirectEmpleados = () => navigate('/admin/empleados');

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

    const conseguirEmpleado = async (dni) => {
        let data;
        try {
            const response = await fetch(`http://localhost:8000/api/empleadosDNI/${dni}`);
            data = await response.json();
            console.log(data);
            // null -> no existe
            // si data == null -> empleado NO existe, devolver true
            console.log('Es null?');
            console.log(data == null);
        } catch (error) {
            console.log('entra aca');
        }
        if (data == null) {
            console.log('devolviendo true');
            return true;
        }
        else {
            console.log('devolviendo fasle');
            return false;
        }
    }

    const chequeo = () => {
        [refNombre, refApellido, refDNI, refEmail,refTelefono, refSucursal,refConfirm, refContra].forEach(r => r.current.style.color = '');
        if (!nombre) {
            setError('Se debe ingresar un nombre.');
            refNombre.current.style.color = 'red';
            return false;
        }
        if (!apellido) {
            setError('Se debe ingresar un apellido.');
            refApellido.current.style.color = 'red';
            return false;
        }
        if (!dni) {
            setError('Se debe ingresar el número de DNI.');
            refDNI.current.style.color = 'red';
            return false;
        }
        if (!conseguirEmpleado(dni)) {
            setError('El empleado con ese DNI ya existe.');
            refDNI.current.style.color = 'red';
            return false;
        }
        if (!email) {
            setError('Se debe ingresar un email.');
            refEmail.current.style.color = 'red';
            return false;
        }
        if (!telefono) {
            setError('Se debe ingresar un telefono.');
            refTelefono.current.style.color = 'red';
            return false;
        }
        if (!sucursal) {
            setError('Se debe elegir una sucursal.');
            refSucursal.current.style.color = 'red';
            return false;
        }
        if (!email.endsWith('ferreplus.com')) {
            setError('El email debe ser de Ferreplus.')
            refEmail.current.style.color = 'red';
            return false;
        }
        if (!password) {
            setError('Se debe ingresar una contraseña.');
            refContra.current.style.color = 'red';
            return false;
        }
        if (!confirmPassword) {
            setError('Se debe confirmar la contraseña.');
            refConfirm.current.style.color = 'red';
            return false;
        }
        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            refContra.current.style.color = 'red';
            refConfirm.current.style.color = 'red';
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
                        <label htmlFor='nombre' ref={refNombre}> Nombre: </label>
                        <input className="form-control" type="text" placeholder='Juan' id='nombre' value={nombre} onChange={e => setNombre(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor='apellido' ref={refApellido}> Apellido: </label>
                        <input className="form-control" type="text" placeholder='Perez' id='apellido' value={apellido} onChange={e => setApellido(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="dni" className="form-label" ref={refDNI}>DNI:</label>
                        <input type="text" className="form-control" placeholder='33.333.333' id="dni" value={dni} onChange={e => setDni(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label" ref={refEmail}> Email: </label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ejemplo123@ferreplus.com' value={email} onChange={e => setEmail(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="telefono" className="form-label" ref={refTelefono}>Teléfono:</label>
                        <input type="tel" className="form-control" placeholder='221-5678758' id="telefono" value={telefono} onChange={e => setTelefono(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sucursal" className="form-label" ref={refSucursal}>Sucursal:</label>
                        <select className="form-control" id="sucursal" value={sucursal} onChange={e => setSucursal(e.target.value)}>
                            <option value="">Seleccione una sucursal</option>
                            {sucursales.map((sucursal, index) => (
                                <option key={sucursal._id} value={sucursal._id}>{sucursal.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra1' ref={refContra}>
                            Contraseña:</label>
                        <input className="form-control" id="exampleInputPassword1" type="password" placeholder='Contraseña' value={password} onChange={e => setPassword(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label" id='labelContra2' ref={refConfirm}>
                            Confirmar contraseña:</label>
                        <input className="form-control" id="exampleInputPassword2" type="password" placeholder='Repetir contraseña' value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} onKeyDown={handleKeyDown} />
                    </div>

                    <button className="btn btn-primary" onClick={registrarEmpleado}>Agregar Empleado</button>

                    <p style={{ color: message === 'Empleado agregado con éxito!' ? '#07f717' : 'red' }}> {message} </p>

                    {error && <p className='errorContainer'>{error}</p>}
                    <p className='textoRedireccion' onClick={redirectEmpleados}> Volver a la gestión de empleados </p>
                </div>
                : <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}