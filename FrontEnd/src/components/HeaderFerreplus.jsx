import React from 'react'
import logo from '../assets/logo.png';

export const HeaderFerreplus = () => {
  return (
    <header>

      <a href="/">
        <img src={logo} alt="" id="logoFerreplus" />
      </a>

      <div class="search-container">
        <input type="text" class="search-input" placeholder="Buscá en Ferreplus..." />
        <button type="submit" class="search-button">
          <i class="fa fa-search"></i>Buscar
        </button>
      </div>

      <div className="botones">
        <button className='botonesInicioSesion'>
          Iniciar sesión
        </button>
        <button className='botonesInicioSesion' id='botonRegistro'>
          Registrarse
        </button>
      </div>

    </header>
  )
}
