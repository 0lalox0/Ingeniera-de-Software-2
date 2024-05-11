import React, { useState } from 'react';

export const Admin = () => {

  const [nombre, setNombre] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [calle, setCalle] = useState('');
  const [numero, setNumero] = useState('');
  let [horaApertura, setApertura] = useState('');
  let [horaCierre, setCierre] = useState('');
  const [message, setMessage] = useState('');

  const agregarSucursal = async () => {
    const horaAperturaDate = new Date('1970-01-01T' + horaApertura);
    const horaCierreDate = new Date('1970-01-01T' + horaCierre);
    console.log(
      nombre, ciudad, calle, numero, horaAperturaDate, horaCierreDate
    );
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
    <div className='formularioSucursal'>
      <h1> Probando página del administrador</h1>
      <h2>Agregar sucursal: </h2>

      <div className="mb-3">
        <label htmlFor="nombreSucursal"> Nombre </label>
        <input className="form-control" type="text" id='nombreSucursal' value={nombre} onChange={e => setNombre(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="ciudadSucursal"> Ciudad: </label>
        <input className="form-control" type="text" id='ciudadSucursal' value={ciudad} onChange={e => setCiudad(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="calleSucursal">Calle: </label>
        <input className="form-control" type="text" id='calleSucursal' value={calle} onChange={e => setCalle(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="numeroSucursal"> Número: </label>
        <input className="form-control" type="number" id='numeroSucursal' value={numero} onChange={e => setNumero(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="horarioAperturaSucursal"> Horario de apertura: </label>
        <input className="form-control" type="time" id='horarioAperturaSucursal' value={horaApertura} onChange={e => setApertura(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="horarioCierreSucursal">Horario de cierre: </label>
        <input className="form-control" type="time" id='horarioCierreSucursal' value={horaCierre} onChange={e => setCierre(e.target.value)} />
      </div>

      <button className='search-button' onClick={agregarSucursal}> Agregar sucursal</button>
      <p> {message} </p>
    </div>
  )
}
