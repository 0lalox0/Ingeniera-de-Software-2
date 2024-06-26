import React from 'react';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import sucursales from '../assets/sucursales.png';
import estadisticas from '../assets/estadisticas.png';
import empleados from '../assets/gestionar-empleados.png';
import { useNavigate } from 'react-router-dom';
import CardComponent from './Card';
import Footer from './Footer';

export const Admin = () => {
  const { role } = useUser();
  const navigate = useNavigate();

  const redirectSucursales = () => navigate('/admin/sucursales');

  const redirectEmpleados = () => navigate('/admin/empleados');

  const redirectEstadisticas = () => navigate('/admin/estadisticas');

  return (
    <>
      {role === 'admin' ?
        <>
          <div className='perfilUsuario'>
            <h1 style={{ color: "#242465" }}> Administración de Ferreplus Intercambios</h1>
            <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás gestionar toda la información relacionada a Ferreplus Intercambios.</p>
          </div>

          <div className='card-container'>

            <CardComponent
              title='Gestionar sucursales'
              paragraph='Acá vas a poder gestionar las sucursales de Ferreplus.'
              imageSrc={sucursales}
              onClick={redirectSucursales}
            />

            <CardComponent
              title='Visualizar estadísticas'
              paragraph='Acá vas a poder todas las estadísticas de Ferreplus.'
              imageSrc={estadisticas}
              onClick={redirectEstadisticas}
            />

            <CardComponent
              title='Gestionar empleados'
              paragraph='Acá vas a poder gestionar a los empleados de Ferreplus.'
              imageSrc={empleados}
              onClick={redirectEmpleados}
            />
          
          </div>
        <Footer />
        </>
        : <Mantenimiento> </Mantenimiento>
      }
    </>
  )
}
