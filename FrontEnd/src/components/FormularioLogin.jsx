import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword,sendPasswordResetEmail } from 'firebase/auth';

export const FormularioLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const olvidoContra = async () => {
      try{
       await sendPasswordResetEmail(getAuth(),email);
      } catch (e){
        setError(e.message);
      }
    }
    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate('/productos');
        } catch (e) {
            setError(e.message);
        }
    }

    function redirectRegistro() {
        navigate("/registrarse");
    }


    return (
        <div className='formularioLogin'>
            {/* <form> */}
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
                <button className="btn btn-primary" onClick={logIn}>Iniciar sesión</button>

            {/* </form> */}
            <p></p>
            <div>
            <button className='botonesInicioSesion' id='botonOlvide' onClick={olvidoContra}>
                Olvide mi contraseña
            </button>
            </div>
            <p>¿No tenés cuenta?</p>
            <button className='botonesInicioSesion' id='botonRegistro' onClick={redirectRegistro}>
                Registrarse
            </button>


        </div>
    );
}