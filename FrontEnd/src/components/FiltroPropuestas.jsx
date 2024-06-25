import React, { useEffect, useState } from 'react'

export const FiltroPropuestas = ({ todos, setProductos, setPropuestasI, miMail, hayPropuestas }) => {
    const [sucursales, setSucursales] = useState([]);
    const [categoria, setCategoria] = useState('todas');
    const [sucursal, setSucursal] = useState('todas');
    const [estado, setEstado] = useState('todas');
    const [solicitante, setSolicitante] = useState('todas');

    useEffect(() => {
        fetch('http://localhost:8000/api/sucursales')
            .then(response => response.json())
            .then(data => setSucursales(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const obtenerCategoria = async (idProducto) => {
        try {
            const res = await fetch(`http://localhost:8000/api/prodIntercambios/${idProducto}`);
            const data = await res.json();
            return data.categoria;
        } catch (error) {
            console.error(error);
        }
    }

    const aplicarFiltros = async () => {
        let propuestasFiltro = todos;

        if (categoria !== 'todas') {
            const propuestasConCategorias = await Promise.all(
                propuestasFiltro.map(async prop => {
                    const categoria = await obtenerCategoria(prop.productoOfrecido);
                    return { ...prop, categoria };
                })
            );
            propuestasFiltro = propuestasConCategorias.filter(prop => prop.categoria === categoria);
        }

        if (estado !== 'todas')
            propuestasFiltro = propuestasFiltro.filter(prop => prop.estado == estado);

        if (sucursal !== 'todas')
            propuestasFiltro = propuestasFiltro.filter(prop => prop.nombreSucursal.trim() == sucursal);

        if (solicitante == 'enviadas')
            propuestasFiltro = propuestasFiltro.filter(prop => prop.usuarioOfrecido == miMail);
        else if (solicitante == 'recibidas')
            propuestasFiltro = propuestasFiltro.filter(prop => prop.usuarioOfrecido !== miMail);

        if (propuestasFiltro.length == 0) {
            setProductos([]);
        }

        setPropuestasI(propuestasFiltro);
    }

    const borrarFiltrado = () => {
        setPropuestasI(todos);
        setEstado('todas');
        setSucursal('todas');
        setCategoria('todas');
        setSolicitante('todas');
    }

    return (
        <>
            <h3 style={{ color: "#242465" }}> Filtrado por estado: </h3>
            <div className="mb-3">
                <select className="form-select" id='filtroEstado' value={estado} onChange={(e) => setEstado(e.target.value)} style={{ width: 'auto' }}>
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

            <h3 style={{ color: "#242465" }}> Filtrado por sucursal: </h3>
            <div className="filtradoSucursales">
                <div className="mb-3">
                    <select id="filtroSucursal" className='form-select' value={sucursal} onChange={(e) => setSucursal(e.target.value)}>
                        <option value="todas" defaultValue={'todas'}> Todas las sucursales</option>
                        {sucursales.map((sucursal) => (
                            <option key={sucursal._id} value={sucursal.nombre}> {sucursal.nombre}</option>
                        ))}
                    </select>
                </div>
            </div>

            <h3 style={{ color: "#242465" }}> Filtrado por solicitante: </h3>
            <div className="filtradoSolicitante">
                <div className="mb-3">
                    <select className='form-select' id='filtroSolicitante' value={solicitante} onChange={(e) => setSolicitante(e.target.value)} style={{ width: 'auto' }}>
                        <option value="todas" defaultValue={'todas'}>Todos los solicitantes</option>
                        <option value="enviadas" key='enviadas'> Enviadas</option>
                        <option value="recibidas" key='recibidas'> Recibidas</option>
                    </select>
                </div>
            </div>

            <div className="botonesFiltro">
                <button type="button" className="btn btn-primary" onClick={aplicarFiltros}> Filtrar </button>
                <button type='button' className='btn btn-danger' id='eliminarFiltros' onClick={borrarFiltrado}> Borrar filtros</button>
                <>
                    {hayPropuestas == 0 ?
                        <p className='errorContainer' id='propuestasNoCoinciden'> No hay propuestas que coincidan. </p>
                        : <> </>
                    }
                </>
            </div>
        </>
    )
}
