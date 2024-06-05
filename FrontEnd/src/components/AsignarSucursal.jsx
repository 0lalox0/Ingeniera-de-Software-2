import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AsignarSucursal = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [sucursales, setSucursales] = useState([]);
    const [sucursal, setSucursal] = useState('');
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');

    const redirectEmpleados = () => navigate('/admin/empleados');
    const redirectSucursales = () => navigate('/admin/sucursales');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            registrarEmpleado();
        }
    };

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/sucursales');
                const data = await response.json();
                setSucursales(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchSucursales();
    }, []);

    useEffect(() => {
        const fetchEmpleados = async () => {
            if (sucursal) {
                const response = await fetch(`http://localhost:8000/api/empleados/sucursal/${sucursal}`);
                const data = await response.json();
                const empleadosActivos = data.filter(empleado => empleado.activo === true);
                setEmpleados(empleadosActivos);
            }
        };
        fetchEmpleados();
    }, [sucursal]);

    const asignarSucursal = async (empleado) => {
        const empleadoActualizado = {
            ...empleado,
            sucursal: sucursalSeleccionada
        };

        try {
            const response = await fetch(`http://localhost:8000/api/empleados/${empleado.email}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(empleadoActualizado)
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Empleado asignado a la sucrusal con éxito!');
                setError('');
            } else {
                setMessage('');
                setError(data.message);
            }
        } catch (error) {
            setMessage('');
            setError('Error al asignar sucursal: ' + error.message);
        }
    };

    return (
        <>
            {role === 'admin' ?
                <div className='formularioRegistro' onKeyDown={handleKeyDown}>
                    <h3 style={{ color: "#242465" }}>
                        Asignar sucursal a un empleado:
                    </h3>

                    <div className="mb-3">
                        <label htmlFor="sucursal" className="form-label">Sucursal del empleado:</label>
                        <select className="form-control" id="sucursal" value={sucursal} onChange={e => setSucursal(e.target.value)}>
                            <option value="">Seleccione una sucursal</option>
                            {sucursales.map((sucursal, index) => (
                                <option key={sucursal._id} value={sucursal._id}>{sucursal.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="empleado" className="form-label">Empleado:</label>
                        <select className="form-control" id="empleado" value={JSON.stringify(empleadoSeleccionado)} onChange={e => setEmpleadoSeleccionado(JSON.parse(e.target.value))}>
                            <option value="">Seleccione un empleado</option>
                            {empleados.map((empleado, index) => (
                                <option key={empleado._id} value={JSON.stringify(empleado)}>
                                    {empleado.nombre} {empleado.apellido} - {empleado.dni}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="sucursal" className="form-label">Sucursal a asignar:</label>
                        <select className="form-control" id="sucursal" value={sucursalSeleccionada} onChange={e => setSucursalSeleccionada(e.target.value)}>
                            <option value="">Seleccione una sucursal</option>
                            {sucursales.filter(sucursalActual => sucursalActual._id !== empleadoSeleccionado.sucursal).map((sucursalActual, index) => (
                                <option key={sucursalActual._id} value={sucursalActual._id}>
                                    {sucursalActual.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button className="btn btn-primary" onClick={() => asignarSucursal(empleadoSeleccionado)}>Asignar sucursal</button>
                    <p style={{ color: message === 'Empleado asignado a la sucrusal con éxito!' ? 'green' : 'red' }}> {message} </p>

                    {error && <p className='errorContainer'>{error}</p>}
                    <p className='textoRedireccion' onClick={redirectEmpleados}> Volver a la gestión de empleados </p>
                    <p className='textoRedireccion' onClick={redirectSucursales}> Volver a la gestión de sucursales </p>
                </div>
                : <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}