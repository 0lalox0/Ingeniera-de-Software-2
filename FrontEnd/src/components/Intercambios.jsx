import React, { useEffect, useState } from 'react';
import useUser from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';

export const Intercambios = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [intercambios, setIntercambios] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [users, setUsers] = useState([]);

    const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');

    useEffect(() => {
        fetch('http://localhost:8000/api/prodintercambios')
            .then(response => response.json())
            .then(data => setIntercambios(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:8000/api/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const buscarSucursal = (id) => {
        return sucursales.find(s => s._id === id);
    }

    const buscarUsuario = (email) => {
        return users.find(u => u.email === email);
    }

    return (
        <div className='clase-intercambios'>
            <div className='titulo-intercambios'>
                <h1 style={{ color: "#242465" }}>Productos para intercambiar</h1>
                <>
                    {role === 'cliente' ?
                        <>
                            <button onClick={redirectAgregar} className="btn btn-success"> Publicar producto para intercambiar</button>
                        </>
                        : <>
                        </>}
                </>
                <div className="intercambios">
                    {intercambios.map((intercambio) => {
                        const usuario = buscarUsuario(intercambio.idUsuario);
                        const linkFoto = intercambio.urlFotos[0];
                        return (
                            <div class="card mb-3" >
                                <div class="row g-0">
                                    <div class="col-md-4">
                                        <img src={linkFoto} class="img-fluid rounded-start" />
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <h5 class="card-title">{intercambio.titulo}</h5>
                                            <p class="card-text">Descripción del producto: {intercambio.descripcion}. 
                                                Sucursal del intercambio: {buscarSucursal(intercambio.sucursal).nombre}. 
                                                Rango horario: {intercambio.inicioRango} - {intercambio.finRango}</p>
                                            <p class="card-text"><small class="text-body-secondary">Publicado por: {usuario.name} {usuario.lastname}</small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="..." class="img-fluid rounded-start" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="..." class="img-fluid rounded-start" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card mb-3" >
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="..." class="img-fluid rounded-start" />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">Card title</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}
