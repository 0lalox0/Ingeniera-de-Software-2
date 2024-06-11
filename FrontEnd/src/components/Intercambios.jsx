import React, { useEffect, useState } from 'react';
import useUser from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';

export const Intercambios = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [intercambios, setIntercambios] = useState([]);
    const [sucursales, setSucursales] = useState([]);
    const [todos, setTodos] = useState([]);
    const [categoria, setCategoria] = useState('todas');
    const [mensajeVisible, setMensajeVisible] = useState(false);
    const [sucursal, setSucursal] = useState('todas');

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');

    const redirectProducto = (idProducto) => navigate(`/intercambios/${idProducto}`);

    const aplicarFiltros = () => {
        let intercambiosFiltrados = todos;

        if (categoria !== 'todas')
            intercambiosFiltrados = intercambiosFiltrados.filter(intercambio => intercambio.categoria === categoria);

        if (sucursal !== 'todas')
            intercambiosFiltrados = intercambiosFiltrados.filter(intercambio => intercambio.nombreSucursal.trim() === sucursal);

        setIntercambios(intercambiosFiltrados);
        setMensajeVisible(intercambiosFiltrados.length === 0);
    }

    const borrarFiltrado = () => {
        setIntercambios(todos);
        setMensajeVisible(false);
        setCategoria('todas');
        setSucursal('todas');
    }

    useEffect(() => {
        fetch('http://localhost:8000/api/prodintercambios')
            .then(response => response.json())
            .then(data => { setIntercambios(data); setTodos(data) })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className='clase-intercambios'>

            <div className='titulo-intercambios'>
                <h1>Productos para intercambiar</h1>
                <>
                    {role === 'cliente' ?
                        <>
                            <button onClick={redirectAgregar} className="btn btn-success"> Publicar producto para intercambiar</button>
                        </>
                        : <> </>}
                </>

                <h3 style={{ color: "#242465" }}>Filtrado por categoría: </h3>
                <div className="filtradoCategorias">
                    <div className="mb-3">
                        <select className="form-select" id="filtroCategoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                            <option value='todas' defaultValue={'todas'}> Todas las categorías</option>
                            <option key="categoria1" value="Construcción"> Construcción </option>
                            <option key="categoria2" value="Madera"> Madera </option>
                            <option key="categoria3" value="Electricidad"> Electricidad </option>
                            <option key="categoria4" value="Herramientas"> Herramientas </option>
                            <option key="categoria5" value="Baño"> Baño </option>
                            <option key="categoria6" value="Cocina"> Cocina </option>
                            <option key="categoria7" value="Jardín"> Jardín </option>
                            <option key="categoria8" value="Ferretería"> Ferretería </option>
                            <option key="categoria9" value="Pintura"> Pintura </option>
                            <option key="categoria10" value="Decoración"> Decoración </option>
                            <option key="categoria11" value="Mobiliario"> Mobiliario </option>
                            <option key="categoria12" value="Climatización"> Climatización </option>
                        </select>
                    </div>
                </div>

                <h3 style={{ color: "#242465" }}>Filtrado por sucursal:</h3>
                <div className="filtradoSucursales">
                    <div className="mb-3">
                        <select name="sucursalI" id="filtroSucursal" className='form-select' value={sucursal} onChange={(e) => setSucursal(e.target.value)}>
                            <option value="todas" defaultValue={'todas'}> Todas las sucursales</option>
                            {sucursales.map((sucursal) => (
                                <option key={sucursal._id} value={sucursal.nombre}> {sucursal.nombre}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={aplicarFiltros}> Filtrar </button>
                <button type='button' className='btn btn-danger' id='eliminarFiltros' onClick={borrarFiltrado}> Borrar filtros</button>
            </div>

            <div className="intercambios">
                {intercambios.map((intercambio) => {
                    return (
                        <div className="card mb-3" key={intercambio._id} onClick={() => redirectProducto(intercambio._id)}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={intercambio.urlFotos[0]} className="img-fluid rounded-start" />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body">
                                        <h5 className="card-title">{intercambio.titulo}</h5>
                                        <p className="card-text"> Sucursal del intercambio: {intercambio.nombreSucursal}</p>
                                        <p className="card-text"> Categoría: {intercambio.categoria}.</p>
                                        <p style={{ color: '#439ac8' }}> Hacé click para obtener más información.</p>
                                        <p className="card-text"><small className="text-body-secondary">Publicado por: {intercambio.nombre} {intercambio.apellido} </small></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <p style={{ display: mensajeVisible ? 'block' : 'none' }} className='errorContainer'> No hay productos para intercambiar publicados que coincidan.</p>
            </div>

        </div>
    )
}
