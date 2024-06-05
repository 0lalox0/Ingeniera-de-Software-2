import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const EliminarEmpleado = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [sucursales, setSucursales] = useState([]);
    const [sucursal, setSucursal] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState('');

    const redirectEmpleados = () => navigate('/admin/empleados');

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

    const bajaEmpleado = async (idEmpleado) => {
        try {
            const response = await fetch(`http://localhost:8000/api/empleados/${idEmpleado}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    activo: false
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setMessage('Empleado dado de baja con éxito!');
            setError('');
            return data;
        } catch (error) {
            setMessage('');
            setError(error.message);
        }
    }

    return (
        <>
            {role === 'admin' ?
                <div className='formularioRegistro' onKeyDown={handleKeyDown}>
                    <h3 style={{ color: "#242465" }}>
                        Dar baja a empleado:
                    </h3>

                    <div className="mb-3">
                        <label htmlFor="sucursal" className="form-label">Sucursal:</label>
                        <select className="form-control" id="sucursal" value={sucursal} onChange={e => setSucursal(e.target.value)}>
                            <option value="">Seleccione una sucursal</option>
                            {sucursales.map((sucursal, index) => (
                                <option key={sucursal._id} value={sucursal._id}>{sucursal.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="empleado" className="form-label">Empleado:</label>
                        <select className="form-control" id="empleado" value={empleadoSeleccionado} onChange={e => setEmpleadoSeleccionado(e.target.value)}>
                            <option value="">Seleccione un empleado</option>
                            {empleados.map((empleado, index) => (
                                <option key={empleado._id} value={empleado.email}>
                                    {empleado.nombre} {empleado.apellido} - {empleado.dni}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className="btn btn-primary" onClick={() => bajaEmpleado(empleadoSeleccionado)}>Dar de baja</button>
                    <p style={{ color: message === 'Empleado dado de baja con éxito!' ? 'green' : 'red' }}> {message} </p>

                    {error && <p className='errorContainer'>{error}</p>}
                    <p className='textoRedireccion' onClick={redirectEmpleados}> Volver a la gestión de empleados </p>
                </div>
                : <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}