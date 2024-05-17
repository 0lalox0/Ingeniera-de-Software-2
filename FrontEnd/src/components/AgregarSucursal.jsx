import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';

export const AgregarSucursal = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [horarioApertura, setHorarioApertura] = useState("");
  const [horarioCierre, setHorarioCierre] = useState("");
  const [message, setMessage] = useState(""); // Nuevo estado para el mensaje
  const redirectSucursales = () => navigate('/admin/sucursales');
  const { role } = useUser();

  const agregarSucursal = async () => {
    const horaAperturaDate = new Date('1970-01-01T' + horarioApertura);
    const horaCierreDate = new Date('1970-01-01T' + horarioCierre);

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
      setMessage("Sucursal agregada con éxito!"); // Establecer mensaje de éxito
    } catch (error) {
      setMessage("Hubo un error al agregar la sucursal."); // Establecer mensaje de error
    }
  }

  return (
    <>
      {role === 'admin' ?
        <div className='formularioSucursal'>
          <h2>Agregar sucursal: </h2>

          <div className="mb-3">
            <label htmlFor="nombreSucursal"> Nombre </label>
            <input className="form-control"
              type="text" id='nombreSucursal'
              value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder='Sucursal La Plata' />
          </div>

          <div className="mb-3">
            <label htmlFor="ciudadSucursal"> Ciudad: </label>
            <input className="form-control"
              type="text" id='ciudadSucursal'
              value={ciudad}
              onChange={e => setCiudad(e.target.value)}
              placeholder='La Plata' />
          </div>

          <div className="mb-3">
            <label htmlFor="calleSucursal">Calle: </label>
            <input className="form-control"
              type="text"
              id='calleSucursal'
              value={calle}
              onChange={e => setCalle(e.target.value)}
              placeholder='Calle 8' />
          </div>

          <div className="mb-3">
            <label htmlFor="numeroSucursal"> Número: </label>
            <input className="form-control"
              type="number"
              id='numeroSucursal'
              value={numero}
              onChange={e => setNumero(e.target.value)}
              placeholder='456' />
          </div>

          <div className="mb-3">
            <label htmlFor="horarioAperturaSucursal"> Horario de apertura: </label>
            <input className="form-control"
              type="time"
              id='horarioAperturaSucursal'
              value={horarioApertura}
              onChange={e => setHorarioApertura(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="horarioCierreSucursal">Horario de cierre: </label>
            <input className="form-control" type="time" id='horarioCierreSucursal' value={horarioCierre} onChange={e => setHorarioCierre(e.target.value)} />
          </div>

          <button className='search-button' onClick={agregarSucursal}> Agregar sucursal</button>
          <p style={{ color: message === 'Sucursal agregada con éxito!' ? '#07f717' : 'red' }}> {message} </p>
          <p className="textoRedireccion" onClick={redirectSucursales}> Volver a Gestión de Sucursales</p>
        </div>
        : <Mantenimiento> </Mantenimiento>
      }
    </>
  )
}