import React, { useState, useEffect } from 'react'
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';

export const ListarEmpleados = () => {
    const [empleados, setEmpleados] = useState([]);
    const { role } = useUser();

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
                    <div className='titulo-empleados'>
                        <h1 style={{ color: "#242465" }}>Empleados de Ferreplus</h1>
                    </div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th style={{ color: "#242465" }} scope="col">Nombre</th>
                                <th style={{ color: "#242465" }} scope="col">Apellido</th>
                                <th style={{ color: "#242465" }} scope="col">DNI</th>
                                <th style={{ color: "#242465" }} scope="col">Email</th>
                                <th style={{ color: "#242465" }} scope="col">Teléfono</th>
                                <th style={{ color: "#242465" }} scope="col">Sucursal asignada</th>
                                <th style={{ color: "#242465" }} scope="col">Activo</th>
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