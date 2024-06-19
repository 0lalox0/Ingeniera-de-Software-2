import React from 'react';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import { Mantenimiento } from './Mantenimiento';
import CardComponent from './Card';
import empleados from '../assets/estadisticas-empleados.png';
import sucursales from '../assets/estadisticas-sucursales.png';
import categorias from '../assets/estadisticas-categorias.png';

export const GestionEstadisticas = () => {
  const { role } = useUser();
  const navigate = useNavigate();

  const redirectAdmin = () => navigate('/admin');

  return (
    <>
      {role === 'admin' ? <>
        <div className="perfilUsuario">

          <h1 style={{ color: "#242465" }}> Visualización de estadísticas</h1>
          <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás visualizar todas las estadísticas de tus sucursales, empleados, intercambios y más.</p>

        </div>

        <div className="card-container">

          <CardComponent
            title='Estadísticas de sucursales'
            paragraph='Visualizá las estadísticas de las sucursales de Ferreplus'
            imageSrc={sucursales}
          />

          <CardComponent
            title='Estadísticas de categorías'
            paragraph='Visualizá las estadísticas de las categorías de los productos'
            imageSrc={categorias}
          />

          <CardComponent
            title='Estadísticas de empleados'
            paragraph='Visualizá las estadísticas de los empleados de Ferreplus'
            imageSrc={empleados}
          />

        </div>
        <p onClick={redirectAdmin} className='textoRedireccion'> Volver al panel administrativo</p>
      </>
        : <Mantenimiento />}
    </>
  )
}
