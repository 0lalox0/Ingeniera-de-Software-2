import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

export const FormularioLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            logIn();
        }
    };

    const chequeo = () => {
        if (!email) {
            setError('Se debe ingresar un mail.')
            return false;
        }
        if (!password) {
            setError('Se debe ingresar la contraseña de ' + email);
            return false;
        }
        return true;
    }

    const logIn = async () => {
        if (chequeo()) {
            try {
                await signInWithEmailAndPassword(getAuth(), email, password);
                localStorage.setItem("email", email);
                navigate('/productos');
            } catch (e) {
                if (e.message.includes("auth/wrong-password"))
                    setError('Mail o contraseña incorrectos');
                else
                    setError("Error al iniciar sesión");
            }
        }
    }

    const redirectRegistro = () => navigate('/registrarse');

    const redirectCambio = () => navigate('/cambioContra');

    return (
        <div className='formularioLogin' onKeyDown={handleKeyDown}>

            <h3 style={{ color: "#242465" }}>
                ¡Iniciá sesión en Ferreplus Intercambios!
            </h3>

            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label" style={{ color: error === 'Se debe ingresar un mail.' ? 'red' : 'black' }}>Mail:</label>
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
                <label htmlFor="exampleInputPassword1" className="form-label" style={{ color: error === 'Se debe ingresar la contraseña de ' + email ? 'red' : 'black' }}>Contraseña:</label>
                <input
                    className="form-control"
                    id="exampleInputPassword1"
                    type="password"
                    placeholder='Contraseña'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown} />
            </div>
            <button className="btn btn-primary" onClick={logIn}>Iniciar sesión</button>

            <p className='textoRedireccion' onClick={redirectCambio}> Olvidé mi contraseña </p>

            {error && <p className='errorContainer'>{error}</p>}

            <p onClick={redirectRegistro} className='textoRedireccion'>
                ¿No tenés cuenta? Registrarse
            </p>
        </div>
    );
}