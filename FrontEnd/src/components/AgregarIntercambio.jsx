import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';

export const AgregarIntercambio = () => {
    const navigate = useNavigate();
    const { role } = useUser();
    const [sucursales, setSucursales] = useState([]);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [mensaje, setMensaje] = useState('');
    const refTitulo = useRef(null);
    const refDescripcion = useRef(null);
    const refFotos = useRef(null);

    const redirectGestion = () => navigate('/perfilUsuario/intercambios');

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const seleccionarSucursal = (event) => {
        const idSeleccionada = event.target.value;
        setSucursalSeleccionada(sucursales.find(s => s._id === idSeleccionada));
    }

    const chequeo = () => {
        if (titulo === '') {
            setMensaje('Por favor, ingrese un título.');
            refTitulo.current.style.color = 'red';
            return false;
        }
        if (descripcion === '') {
            setMensaje('Por favor, ingrese una descripción.');
            refDescripcion.current.style.color = 'red';
            return false;
        }
    }

    const publicarIntercambio = () => {
        if (chequeo) {
            console.log(sucursalSeleccionada);
        }
    }

    return (
        <>
            {role === 'cliente' ?
                <div className='formularioIntercambio'>
                    <h2 style={{ color: "#242465" }}> Agregar producto para intercambiar </h2>
                    <p> ¡Agregá un producto que ya no uses y esté juntando polvo en tu casa para intercambiar con otro que necesites!</p>

                    <div className="mb-3">
                        <label htmlFor="tituloIntercambio" ref={refTitulo}> Título del producto: </label>
                        <input type="text" className="form-control" id='tituloIntercambio' placeholder='Tornillos con poco uso' value={titulo} onChange={e => setTitulo(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcionIntercambio" ref={refDescripcion}> Descripción del producto: </label>
                        <input type="text" className="form-control" id='descripcionIntercambio' placeholder='Intercambio tornillos de 22 cm. marca CAT con muy poco uso.' value={descripcion} onChange={e => setDescripcion(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="fotosIntercambio" ref={refFotos}> Fotos del producto: </label>
                        <p> Podés agregar hasta 2 fotos.</p>
                        <input type="file" className="form-control" id='fotosIntercambio' accept="image/*" />
                        <input type="file" className="form-control" accept="image/*" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoria"> Categoría del producto: </label>
                        <select className="form-select" id="categoria">
                            <option key="categoria1" value="categoria1"> Construcción </option>
                            <option key="categoria2" value="categoria2"> Madera </option>
                            <option key="categoria3" value="categoria3"> Electricidad </option>
                            <option key="categoria4" value="categoria4"> Herramientas </option>
                            <option key="categoria5" value="categoria5"> Baño </option>
                            <option key="categoria6" value="categoria6"> Cocina </option>
                            <option key="categoria7" value="categoria7"> Jardín </option>
                            <option key="categoria8" value="categoria8"> Ferretería </option>
                            <option key="categoria9" value="categoria9"> Pintura </option>
                            <option key="categoria10" value="categoria10"> Decoración </option>
                            <option key="categoria11" value="categoria11"> Mobiliario </option>
                            <option key="categoria12" value="categoria12"> Climatización </option>
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sucursalIntercambio"> Sucursal: </label>
                        <select className='form-select' id="sucursalIntercambio" onChange={seleccionarSucursal}>
                            {sucursales.map((sucursal) => {
                                return (
                                    <option key={sucursal._id} value={sucursal._id}> {sucursal.nombre}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="horarioInicioIntercambio"> Horario de inicio para intercambiar: </label>
                        <input type="time" className="form-control" id='horarioInicioIntercambio' />
                    </div>

                    <p> Recordá que el horario debe estar en el rango donde la sucursal elegida esté abierta.</p>

                    <div className="mb-3">
                        <label htmlFor="horarioFinIntercambio"> Horario de fin para intercambiar: </label>
                        <input type="time" className="form-control" id='horarioFinIntercambio' />
                    </div>

                    <button className="btn btn-info" onClick={publicarIntercambio}> Publicar intercambio</button>
                    <p className='errorContainer'> {mensaje} </p>
                    <p className="textoRedireccion" onClick={redirectGestion}> Volver a la gestión de intercambios</p>
                </div>
                : <Mantenimiento></Mantenimiento>}
        </>
    )
}
