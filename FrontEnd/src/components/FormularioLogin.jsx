import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export const FormularioLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/productos');
        } catch (e) {
            setError(e.message);
        }
    }

    const redirectRegistro = () => {
        navigate("/registrarse");
    }

    const redirectCambio = () => {
        navigate('/cambioContra');
    }

    return (
        <div className='formularioLogin'>
            <h3>
                ¡Iniciá sesión en Ferreplus Intercambios!
            </h3>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Mail:</label>
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
                <label htmlFor="exampleInputPassword1" className="form-label">Contraseña:</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)} />
            </div>
            <button className="btn btn-primary" onClick={logIn}>Iniciar sesión</button>

            <p className='textoRedireccion' onClick={redirectCambio}> Olvidé mi contraseña </p>

            {error && <p className='error'>{error}</p>}

            <p onClick={redirectRegistro} className='textoRedireccion'>
                ¿No tenés cuenta? Registrarse
            </p>
        </div>
    );
}