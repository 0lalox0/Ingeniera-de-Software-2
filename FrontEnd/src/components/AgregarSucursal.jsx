import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';

export const AgregarSucursal = () => {
  const { role } = useUser();
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [horarioApertura, setHorarioApertura] = useState("");
  const [horarioCierre, setHorarioCierre] = useState("");
  const [message, setMessage] = useState("");
  const refMensaje = useRef(null);

  const redirectSucursales = () => navigate('/admin/sucursales');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      agregarSucursal();
    }
  };

  const chequeo = () => {
    if (!nombre) {
      setMessage('Por favor, ingrese un nombre.');
      refMensaje.current.style.color = 'red';
      return false;
    }
    if (!ciudad) {
      setMessage('Por favor, ingrese una ciudad.');
      refMensaje.current.style.color = 'red';
      return false;
    }
    if (!calle) {
      setMessage('Por favor, ingrese una calle.');
      refMensaje.current.style.color = 'red';
      return false;
    }
    if (!numero) {
      setMessage('Por favor, ingrese un número.');
      refMensaje.current.style.color = 'red';
      return false;
    }
    if (!horarioApertura) {
      setMessage('Por favor, ingrese un horario de apertura.');
      refMensaje.current.style.color = 'red';
      return false;
    }
    if (!horarioCierre) {
      setMessage('Por favor, ingrese un horario de cierre.');
      refMensaje.current.style.color = 'red';
      return false;
    }
    if (horarioApertura > horarioCierre) {
      setMessage('Por favor, ingrese un horario válido.');
      refMensaje.current.style.color = 'red';
      return false;
    }
    return true;
  }

  const agregarSucursal = async () => {
    if (chequeo()) {
      const horaAperturaDate = new Date('1970-01-01T' + horarioApertura + '-03:00');
      const horaCierreDate = new Date('1970-01-01T' + horarioCierre + '-03:00');
      let mandarSucursal = {
        nombre: nombre,
        ciudad: ciudad,
        calle: calle,
        numero: numero,
        horarioApertura: horaAperturaDate,
        horarioCierre: horaCierreDate
      };
      try {
        const response = await fetch('http://localhost:8000/api/sucursales', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(mandarSucursal)
        });
        const data = await response.json();
        setMessage("¡Sucursal agregada con éxito!");
        refMensaje.current.style.color = '#07f717';
      } catch (error) {
        setMessage("Hubo un error al agregar la sucursal.");
        refMensaje.current.style.color = 'red';
      }
    }
  }

  return (
    <>
      {role === 'admin' ?
        <div className='formularioSucursal' onKeyDown={handleKeyDown}>
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
          <p ref={refMensaje}> {message} </p>
          <p className="textoRedireccion" onClick={redirectSucursales}> Volver a Gestión de Sucursales</p>
        </div>
        : <Mantenimiento> </Mantenimiento>
      }
    </>
  )
}