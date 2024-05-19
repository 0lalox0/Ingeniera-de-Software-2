import React from 'react';
import useUser from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';

export const Intercambios = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');

    return (
        <div className='clase-intercambios'>
            <div className='titulo-intercambios'>
                <h1 style={{ color: "#242465" }}>Productos para intercambiar</h1>
                <>
                    {role === 'cliente' ?
                        <>
                            <button onClick={redirectAgregar}> Publicar producto para intercambiar</button>
                            <div className="intercambios">
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
                            </div>
                        </>
                        : <>
                        </>}
                </>
            </div>
        </div>
    )
}
