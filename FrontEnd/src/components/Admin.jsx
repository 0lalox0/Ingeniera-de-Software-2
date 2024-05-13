import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import agregar from '../assets/agregar-sucursal.png'
import productos from '../assets/productos.png'
import intercambio from '../assets/intercambio.png'
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
          
          <div className='card-container'>
            <div className="card" onClick={redirectAgregarSucursal}>
              <img src={agregar} alt="" />
              <div className="card-content">
                <h3> Agregar sucursal</h3>
                <p> Acá vas a poder agregar sucursales de Ferreplus.</p>
              </div>
            </div>

            <div className="card">
              <img src={productos} alt="" />
              <div className="card-content">
                <h3> Eliminar sucursal</h3>
                <p> Acá vas a poder eliminar sucursales de Ferreplus.</p>
              </div>
            </div>

            <div className="card">
              <img src={intercambio} alt="" />
              <div className="card-content">
                <h3> Visualizar estadísticas</h3>
                <p> Acá vas a poder todas las estadísticas de Ferreplus.</p>
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
