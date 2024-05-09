import React from 'react'
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { getAuth, signOut } from 'firebase/auth';

export const HeaderFerreplus = () => {

  const navigate = useNavigate();

  const redirectInicioSesion = () => navigate('/inicioSesion');

  const redirectRegistro = () => navigate('/registrarse');

  const redirectHome = () => navigate('/');

  const redirectProductos = () => navigate('/productos');

  const redirectIntercambios = () => navigate('/intercambios');

  const redirectSucursales = () => navigate('/sucursales');

  const isActive = (path) => {
    return location.pathname === path;
  }

  const { user } = useUser();

  return (
    <header>

      <img src={logo} alt="" id="logoFerreplus" onClick={redirectHome} />

      <div className="search-container">
        <input type="text" className="search-input" placeholder="Buscá en Ferreplus..." id='buscador' />
        <button type="submit" className="search-button">
          <i className="fa fa-search"></i>Buscar
        </button>
      </div>

      <div className='menuOpciones'>
        <ul>
          <li onClick={redirectProductos} className={isActive('/productos') ? 'paginaActiva' : ''}> Catálogo de ventas</li>
          <li onClick={redirectIntercambios} className={isActive('/intercambios') ? 'paginaActiva' : ''}> Intercambios</li>
          <li onClick={redirectSucursales} className={isActive('/sucursales') ? 'paginaActiva' : ''}> Sucursales</li>
        </ul>
      </div>

      <div className="botones">
        {user
          ? <>
          <button className='botonesInicioSesion' id='botonMiPerfil'> Mi Perfil </button>
          <button className='botonesInicioSesion' onClick={() => { signOut(getAuth()); }}> Cerrar sesión </button>
          </> 
          : <>
            <button className='botonesInicioSesion' onClick={redirectInicioSesion}> Iniciar sesión </button>
            <button className='botonesInicioSesion' id='botonRegistro' onClick={redirectRegistro}> Registrarse </button>
          </>
        }
      </div>

    </header>
  )
}
