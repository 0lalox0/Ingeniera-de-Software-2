import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import sucursales from '../assets/sucursales.png';
import estadisticas from '../assets/estadisticas.png';
import empleados from '../assets/empleados.png';
import { useNavigate } from 'react-router-dom';

export const Admin = () => {
  const { role } = useUser();
  const navigate = useNavigate();
  const redirectAgregarSucursal = () => navigate('/admin/agregarSucursal');

  return (
    <>
      {role === 'admin' ?
        <div className='perfilUsuario'>
          <h1 style={{ color: "#242465" }}> Administración de Ferreplus Intercambios</h1>
          <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás gestionar toda la información relacionada a Ferreplus intercambios.</p>
          
          <div className='card-container' id='cardAdministrador'>
            <div className="card" onClick={redirectAgregarSucursal}>
              <img src={sucursales} alt="" />
              <div className="card-content">
                <h3> Gestionar sucursales</h3>
                <p> Acá vas a poder gestionar las sucursales de Ferreplus.</p>
              </div>
            </div>

            <div className="card">
              <img src={estadisticas} alt="" />
              <div className="card-content">
                <h3> Visualizar estadísticas</h3>
                <p> Acá vas a poder todas las estadísticas de Ferreplus.</p>
              </div>
            </div>

            <div className="card">
              <img src={empleados} alt="" />
              <div className="card-content">
                <h3> Gestionar empleados</h3>
                <p> Acá vas a poder gestionar a los empleados de Ferreplus.</p>
              </div>
            </div>

          </div>
        </div>
        :
        <Mantenimiento> </Mantenimiento>
      }
    </>
  )
}
