import React, { useEffect, useRef, useState } from 'react'
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
  const [sucursales, setSucursales] = useState([]);
  const refMensaje = useRef(null);
  const refNombre = useRef(null);
  const refCiudad = useRef(null);
  const refCalle = useRef(null);
  const refNumero = useRef(null);
  const refHA = useRef(null);
  const refHC = useRef(null);

  const redirectSucursales = () => navigate('/admin/sucursales');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      agregarSucursal();
    }
  };

  useEffect(() => {
    fetch('http://localhost:8000/api/sucursales')
      .then(response => response.json())
      .then(data => setSucursales(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const sucursalExiste = (calle, numero) => {
    const sucuCalle = sucursales.find((sucursal) => sucursal.calle == calle && sucursal.numero == numero); // si no encuentra una sucursal, devuelve undefined
    return !(sucuCalle === undefined);
    // if (sucuCalle === undefined)
    //   return false;
    // else
    //   return true;
  }

  const chequeo = () => {
    [refNombre, refCiudad, refCalle, refNumero, refHA, refHC].forEach(ref => ref.current.style.color = '');
    if (!nombre) {
      setMessage('Por favor, ingrese un nombre.');
      refNombre.current.style.color = 'red';
      return false;
    }
    if (!ciudad) {
      setMessage('Por favor, ingrese una ciudad.');
      refCiudad.current.style.color = 'red';
      return false;
    }
    if (!calle) {
      setMessage('Por favor, ingrese una calle.');
      refCalle.current.style.color = 'red';
      return false;
    }
    if (!numero) {
      setMessage('Por favor, ingrese un número.');
      refNumero.current.style.color = 'red';
      return false;
    }
    if (!horarioApertura) {
      setMessage('Por favor, ingrese un horario de apertura.');
      refHA.current.style.color = 'red';
      return false;
    }
    if (!horarioCierre) {
      setMessage('Por favor, ingrese un horario de cierre.');
      refHC.current.style.color = 'red';
      return false;
    }
    if (horarioApertura > horarioCierre) {
      setMessage('Por favor, ingrese un horario válido.');
      refHA.current.style.color = 'red';
      refHC.current.style.color = 'red';
      return false;
    }
    if (sucursalExiste(calle, numero)) {
      setMessage(`Ya existe una sucursal en la calle ${calle} con número ${numero}. Por favor, ingrese una dirección válida`);
      refCalle.current.style.color = 'red';
      refNumero.current.style.color = 'red';
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
        refMensaje.current.style.color = '#07f717';
        setMessage("¡Sucursal agregada con éxito!");
        fetch('http://localhost:8000/api/sucursales')
          .then(response => response.json())
          .then(data => setSucursales(data))
          .catch(error => console.error('Error:', error));
      } catch (error) {
        setMessage("Hubo un error al agregar la sucursal.");
      }
    }
  }

  return (
    <>
      {role === 'admin' ?
        <div className='formularioSucursal' onKeyDown={handleKeyDown}>
          <h2>Agregar sucursal: </h2>

          <div className="mb-3">
            <label htmlFor="nombreSucursal" ref={refNombre}> Nombre </label>
            <input className="form-control"
              type="text" id='nombreSucursal'
              value={nombre} onChange={e => setNombre(e.target.value)}
              placeholder='Sucursal La Plata' />
          </div>

          <div className="mb-3">
            <label htmlFor="ciudadSucursal" ref={refCiudad}> Ciudad: </label>
            <input className="form-control"
              type="text" id='ciudadSucursal'
              value={ciudad}
              onChange={e => setCiudad(e.target.value)}
              placeholder='La Plata' />
          </div>

          <div className="mb-3">
            <label htmlFor="calleSucursal" ref={refCalle}>Calle: </label>
            <input className="form-control"
              type="text"
              id='calleSucursal'
              value={calle}
              onChange={e => setCalle(e.target.value)}
              placeholder='Calle 8' />
          </div>

          <div className="mb-3">
            <label htmlFor="numeroSucursal" ref={refNumero}> Número: </label>
            <input className="form-control"
              type="number"
              id='numeroSucursal'
              value={numero}
              onChange={e => setNumero(e.target.value)}
              placeholder='456' />
          </div>

          <div className="mb-3">
            <label htmlFor="horarioAperturaSucursal" ref={refHA}> Horario de apertura: </label>
            <input className="form-control"
              type="time"
              id='horarioAperturaSucursal'
              value={horarioApertura}
              onChange={e => setHorarioApertura(e.target.value)} />
          </div>

          <div className="mb-3">
            <label htmlFor="horarioCierreSucursal" ref={refHC}>Horario de cierre: </label>
            <input className="form-control" type="time" id='horarioCierreSucursal' value={horarioCierre} onChange={e => setHorarioCierre(e.target.value)} />
          </div>

          <button className='search-button' onClick={agregarSucursal}> Agregar sucursal</button>
          <p className='errorContainer' ref={refMensaje}> {message} </p>
          <p className="textoRedireccion" onClick={redirectSucursales}> Volver a Gestión de Sucursales</p>
        </div>
        : <Mantenimiento> </Mantenimiento>
      }
    </>
  )
}