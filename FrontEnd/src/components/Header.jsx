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

  const redirectPerfil = () => navigate('/perfilUsuario');

  const redirectAdmin = () => navigate('/admin');

  const isActive = (path) => {
    return location.pathname === path;
  }

  const { role } = useUser();

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
          <li onClick={redirectProductos} className={isActive('/productos') || isActive('/') ? 'paginaActiva' : ''}> Catálogo de ventas</li>
          <li onClick={redirectIntercambios} className={isActive('/intercambios') ? 'paginaActiva' : ''}> Intercambios</li>
          <li onClick={redirectSucursales} className={isActive('/sucursales') ? 'paginaActiva' : ''}> Sucursales</li>
        </ul>
      </div>

      <div className="botones">
        {role === 'cliente' ? <>
          <button className='botonesInicioSesion' id='botonMiPerfil' onClick={redirectPerfil}> Mi Perfil </button>
          <button className='botonesInicioSesion' onClick={() => { signOut(getAuth()); location.reload() }}> Cerrar sesión </button>
        </>
          :
          role === 'admin' ? <>
            <button className='botonesInicioSesion' id='botonAdministrar' onClick={redirectAdmin}> Administrar </button>
            <button className='botonesInicioSesion' onClick={() => { signOut(getAuth()); location.reload() }}> Cerrar sesión </button>
          </>
            : role === 'empleado' ? <>
              <button className='botonesInicioSesion' id='botonGestionar'> Gestionar </button>
              <button className='botonesInicioSesion' onClick={() => { signOut(getAuth()); location.reload() }}> Cerrar sesión </button>
            </> : <>
              <button className='botonesInicioSesion' onClick={redirectInicioSesion}> Iniciar sesión </button>
              <button className='botonesInicioSesion' id='botonRegistro' onClick={redirectRegistro}> Registrarse </button>
            </>
        }
      </div>

      <div id='dropdown' style={{ display: 'none' }}>
        <div className="dropdown">
          <a className="btn dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false" id='botonDropdownHeader'>
            Menú de opciones
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" onClick={redirectHome}> Catálogo de ventas</a></li>
            <li><a className="dropdown-item" onClick={redirectIntercambios}>Intercambios</a></li>
            <li><a className="dropdown-item" onClick={redirectSucursales}>Sucursales</a></li>
            <li><hr className="dropdown-divider" /></li>
            {role === 'admin' ? <>
              <li><a className="dropdown-item" onClick={redirectAdmin}>Administrar</a></li>
              <li><a className="dropdown-item" onClick={() => { signOut(getAuth()); location.reload() }}>Cerrar sesión</a></li>
            </>
              : role === 'cliente' ? <>
                <li><a className="dropdown-item" onClick={redirectPerfil}>Mi Perfil</a></li>
                <li><a className="dropdown-item" onClick={() => { signOut(getAuth()); location.reload() }}>Cerrar sesión</a></li>
              </>
                : role === 'empleado' ? <>
                  <li><a className="dropdown-item">Gestionar</a></li>
                  <li><a className="dropdown-item" onClick={() => { signOut(getAuth()); location.reload() }}>Cerrar sesión</a></li>
                </> :
                  <>
                    <li><a className="dropdown-item" onClick={redirectInicioSesion}>Iniciar sesión</a></li>
                    <li><a className="dropdown-item" onClick={redirectRegistro}>Registrarse</a></li>
                  </>}
          </ul>
        </div>
      </div>

    </header>
  )
}
