import React, { useEffect, useState } from 'react';
import useUser from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';

export const Intercambios = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [intercambios, setIntercambios] = useState([]);

    const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');

    useEffect(() => {
        fetch('http://localhost:8000/api/prodintercambios')
            .then(response => response.json())
            .then(data => setIntercambios(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const sucursalParticular = async (id) => {
        try {
            const response = await fetch('http://localhost:8000/api/sucursales/' + id);
            return response.json();
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    const usuarioParticular = async (email) => {
        
        fetch('http://localhost:8000/api/users/' + email)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => console.error('Error:', error));
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
                        const linkFoto = intercambio.urlFotos[0];
                        return (
                            <div className="card mb-3"key= {intercambio._id} >
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={linkFoto} className="img-fluid rounded-start" />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title">{intercambio.titulo}</h5>
                                            <p className="card-text">Descripción del producto: {intercambio.descripcion}.
                                                Sucursal del intercambio: {intercambio.nombreSucursal}
                                                Rango horario: {intercambio.inicioRango} - {intercambio.finRango}</p>
                                            <p className="card-text"><small className="text-body-secondary">Publicado por: {intercambio.nombre} {intercambio.apellido} </small></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}

                    {/* <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="..." className="img-fluid rounded-start" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="..." className="img-fluid rounded-start" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card mb-3" >
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src="..." className="img-fluid rounded-start" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        </div>
    )
}
