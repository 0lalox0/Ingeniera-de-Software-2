import React, { useState } from 'react';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import userIcon from '../assets/user-icon.jpg'
import productos from '../assets/productos.jpg'
import intercambio from '../assets/intercambio.png'

export const Admin = () => {

  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  const [horaApertura, setApertura] = useState('');
  const [horaCierre, setCierre] = useState('');
  const [message, setMessage] = useState('');

  const { role } = useUser();

  const agregarSucursal = async () => {
    const horaAperturaDate = new Date('1970-01-01T' + horaApertura);
    const horaCierreDate = new Date('1970-01-01T' + horaCierre);
    try {
      const response = await fetch('http://localhost:8000/api/sucursales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          ciudad,
          calle,
          numero,
          horarioApertura: horaAperturaDate,
          horarioCierre: horaCierreDate
        })
      });
      const data = await response.json();
      console.log(data);
      setMessage("Sucursal agregada con éxito!"); // Establecer mensaje de éxito
    } catch (error) {
      setMessage("Hubo un error al agregar la sucursal."); // Establecer mensaje de error
    }
  }

  return (
    <>
      {role === 'admin' ?
        <div className='perfilUsuario'>
          <h1 style={{ color: "#242465" }}> Administración de Ferreplus Intercambios</h1>
          <p id='textoInfoPerfil' style={{ color: "#242465" }}> Como el administrador, podrás gestionar toda la información relacionada a Ferreplus intercambios.</p>
          <div className='card-container'>
            <div className="card">
              <img src={userIcon} alt="" />
              <div className="card-content">
                <h3> Agregar sucursal</h3>
                <p> Acá vas a poder agregar sucursales de Ferreplus.</p>
                <button> Agregar</button>
              </div>
            </div>

            <div className="card">
              <img src={productos} alt="" />
              <div className="card-content">
                <h3> Eliminar sucursal</h3>
                <p> Acá vas a poder eliminar sucursales de Ferreplus.</p>
                <button> Eliminar </button>
              </div>
            </div>

            <div className="card">
              <img src={intercambio} alt="" />
              <div className="card-content">
                <h3> Mis intercambios</h3>
                <p> Acá vas a poder toda la información relacionada con tus intercambios.</p>
                <button> Administrar </button>
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
