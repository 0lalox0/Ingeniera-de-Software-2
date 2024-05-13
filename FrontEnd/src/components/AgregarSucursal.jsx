import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const AgregarSucursal = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [horarioApertura, setHorarioApertura] = useState("");
  const [horarioCierre, setHorarioCierre] = useState("");
  const [message, setMessage] = useState(""); // Nuevo estado para el mensaje
  const redirectAdmin = () => navigate('/admin');

  const agregarSucursal = async () => {
    try {
      const response = await fetch('http://localhost:8000/sucursales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nombre,
          ciudad,
          calle,
          numero,
          horarioApertura,
          horarioCierre
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
      <p> {message} </p>
      <button onClick={redirectAdmin}> Volver </button>
    </div>
  )
}