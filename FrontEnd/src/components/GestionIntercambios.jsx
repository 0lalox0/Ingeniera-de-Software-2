import React from 'react';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import agregar from '../assets/agregar-intercambio.png';
import eliminar from '../assets/eliminar-intercambio.png';
import propuestas from '../assets/propuestas.png';
import ver from '../assets/ver-intercambios.png';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';

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

          <div className='card-container'>

            <CardComponent
              title='Agregar producto para intercambiar'
              paragraph='Acá vas a poder agregar un producto que ya no uses para intercambiar con otro cliente de Ferreplus.'
              imageSrc={agregar}
              onClick={redirectAgregar}
            />

            <CardComponent
              title='Ver propuestas'
              paragraph='Acá vas a poder ver las propuestas que enviaste y de otros usuarios que quieren intercambiar con vos.'
              imageSrc={propuestas}
              onClick={redirectPropuestas}
            />

            <CardComponent
              title='Ver productos para intercambiar publicados'
              paragraph='Acá vas a poder ver los productos para intercambiar que ya publicaste.'
              imageSrc={ver}
              onClick={redirectEliminar}
            />

          </div>
          <p className="textoRedireccion" onClick={redirectPerfil}> Volver a tu perfil</p>
        </div>
        :
        <Mantenimiento> </Mantenimiento>
      }
    </>
  )
}
