import React from 'react'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';

export const HeaderFerreplus = () => {

  const navigate = useNavigate();

  const redirectInicioSesion = () => {
    navigate("/inicioSesion");
  }

  const redirectRegistro = () => {
    navigate("/registrarse");
  }

  const { user } = useUser();

  return (
    <header>

      <a href="/">
        <img src={logo} alt="" id="logoFerreplus" />
      </a>

      <div className="search-container">
        <input type="text" className="search-input" placeholder="Buscá en Ferreplus..." />
        <button type="submit" className="search-button">
          <i className="fa fa-search"></i>Buscar
        </button>
      </div>

      <div className="botones">
        {user
          ? <button className='botonesInicioSesion' onClick={() => {
            signOut(getAuth());
          }}>
            Cerrar sesión
          </button>
          : <button className='botonesInicioSesion' onClick={redirectInicioSesion}>
            Iniciar sesión
          </button>
        }
        <button className='botonesInicioSesion' id='botonRegistro' onClick={redirectRegistro}>
          Registrarse
        </button>
      </div>

    </header>
  )
}
