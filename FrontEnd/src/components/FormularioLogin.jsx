import { React, Route } from 'react'
import { useNavigate } from 'react-router-dom';

export const FormularioLogin = () => {

    const navigate = useNavigate();

    function redirectRegistro() {
        navigate("/registrarse");
    }

    return (
        <div className='formularioLogin'>
            <form>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Mail</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='ejemplo123@gmail.com' />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </form>
            <p>¿No tenés cuenta?</p>
            <button className='botonesInicioSesion' id='botonRegistro' onClick={redirectRegistro}>
                Registrarse
            </button>
        </div>
    )
}
