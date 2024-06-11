import React from 'react';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import agregar from '../assets/agregar-intercambio.png';
import eliminar from '../assets/eliminar-intercambio.png';
import propuestas from '../assets/propuestas.png';
import ver from '../assets/ver-intercambios.png';
import { useNavigate } from 'react-router-dom';

export const GestionIntercambios = () => {
  const { role } = useUser();
  const navigate = useNavigate();

  const redirectPerfil = () => navigate('/perfilusuario');
  const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');
  const redirectEliminar = () => navigate('/perfilusuario/eliminarintercambio');
  const redirectPropuestas = () => navigate('/perfilusuario/propuestas');

  return (
    <>
      {role === 'cliente' ?
        <div className='perfilUsuario'>
          <h1 style={{ color: "#242465" }}> Gestión de intercambios</h1>
          <p id='textoInfoPerfil' style={{ color: "#242465" }}> Acá vas a poder gestionar toda la información relacionada a tus intercambios.</p>

          <div className='card-container' id='cardAdministrador'>
            <div className="card" onClick={redirectAgregar}>
              <img src={agregar} />
              <div className="card-content">
                <h3> Agregar producto para intercambiar</h3>
                <p> Acá vas a poder agregar un producto que ya no uses para intercambiar con otro cliente de Ferreplus.</p>
              </div>
            </div>

            <div className="card" onClick={redirectEliminar}>
              <img src={eliminar} />
              <div className="card-content">
                <h3> Eliminar producto para intercambiar</h3>
                <p> Acá vas a poder eliminar un producto para intercambiar que hayas publicado.</p>
              </div>
            </div>

            <div className="card" onClick={redirectPropuestas}>
              <img src={propuestas} />
              <div className="card-content">
                <h3> Ver propuestas</h3>
                <p> Acá vas a poder ver las propuestas que enviaste y de otros usuarios que quieren intercambiar con vos.</p>
              </div>
            </div>

            <div className="card">
              <img src={ver} />
              <div className="card-content">
                <h3> Ver productos para intercambiar publicados</h3>
                <p> Acá vas a poder ver los productos para intercambiar que ya publicaste.</p>
              </div>
            </div>

          </div>
          <p className="textoRedireccion" onClick={redirectPerfil}> Volver a tu perfil</p>
        </div>
        :
        <Mantenimiento> </Mantenimiento>
      }
    </>
  )
}
