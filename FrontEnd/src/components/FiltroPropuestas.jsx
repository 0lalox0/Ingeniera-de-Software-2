import React, { useEffect, useState } from 'react'

export const FiltroPropuestas = ({filtrar, borrar, valorEstado, setEstado, valorSucursal, setSucursal, valorCategoria, setCategoria}) => {

    const [sucursales, setSucursales] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <>
            <h3 style={{ color: "#242465" }}> Filtrado por estado: </h3>
            <div className="mb-3">
                <select className="form-select" style={{ width: 'auto' }} value={valorEstado} onChange={(e) => setEstado(e.target.value)} id='filtroEstado'>
                    <option value='todas' defaultValue={'todas'}> Todos los estados</option>
                    <option key="estado1" value="pendiente" style={{ color: '#f2ba1f' }}> Pendiente </option>
                    <option key="estado2" value="aceptado" style={{ color: '#07f717' }}> Aceptado </option>
                    <option key="estado3" value="realizado" style={{ color: '#07f717' }}> Realizado </option>
                    <option key="estado5" value="rechazado" style={{ color: 'red' }}> Rechazado </option>
                    <option key="estado4" value="norealizado" style={{ color: 'red' }}> No realizado </option>
                </select>
            </div>

            <h3 style={{ color: "#242465" }}>Filtrado por categoría: </h3>
            <div className="filtradoCategorias">
                <div className="mb-3">
                    <select className="form-select" id="filtroCategoria" value={valorCategoria} onChange={(e) => setCategoria(e.target.value)}>
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

            <h3 style={{ color: "#242465" }}> Filtrado por sucursal: </h3>
            <div className="filtradoSucursales">
                <div className="mb-3">
                    <select name="sucursalI" id="filtroSucursal" className='form-select' value={valorSucursal} onChange={(e) => setSucursal(e.target.value)}>
                        <option value="todas" defaultValue={'todas'}> Todas las sucursales</option>
                        {sucursales.map((sucursal) => (
                            <option key={sucursal._id} value={sucursal.nombre}> {sucursal.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="botonesFiltro">
                <button type="button" className="btn btn-primary" onClick={filtrar}> Filtrar </button>
                <button type='button' className='btn btn-danger' id='eliminarFiltros' onClick={borrar}> Borrar filtros</button>
            </div>

        </>
    )
}
