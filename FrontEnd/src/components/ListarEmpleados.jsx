import React, { useState, useEffect } from 'react'
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import { useNavigate } from 'react-router-dom';

export const ListarEmpleados = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [empleados, setEmpleados] = useState([]);

    const redirectEmpleados = () => navigate('/admin/empleados');

    useEffect(() => {
        fetch('http://localhost:8000/api/empleados')
            .then(response => response.json())
            .then(data => {
                return Promise.all(data.map(empleado => {
                    return fetch(`http://localhost:8000/api/sucursales/${empleado.sucursal}`)
                        .then(response => response.json())
                        .then(sucursal => {
                            return { ...empleado, sucursal: sucursal.nombre };
                        });
                }));
            })
            .then(empleadosConSucursal => setEmpleados(empleadosConSucursal))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            {role === 'admin' ?
                <div className='clase-empleados'>
                    <div className='titulos titulo-empleados'>
                        <h1> Empleados de Ferreplus </h1>
                        <p className='textoRedireccion' onClick={redirectEmpleados}> Volver a la gestión de empleados </p>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Apellido</th>
                                <th scope="col">DNI</th>
                                <th scope="col">Email</th>
                                <th scope="col">Teléfono</th>
                                <th scope="col">Sucursal asignada</th>
                                <th scope="col">Activo</th>
                            </tr>
                        </thead>
                        <tbody className="table-group-divider">
                            {empleados.map((empleado) => {
                                return (
                                    <tr key={empleado._id}>
                                        <td>{empleado.nombre}</td>
                                        <td>{empleado.apellido}</td>
                                        <td>{empleado.dni}</td>
                                        <td>{empleado.email}</td>
                                        <td>{empleado.telefono}</td>
                                        <td>{empleado.sucursal}</td>
                                        <td>{empleado.activo ? 'Sí' : 'No'}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
                : <Mantenimiento> </Mantenimiento>
            }
        </>
    )
}