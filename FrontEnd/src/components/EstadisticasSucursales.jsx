import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import * as d3 from 'd3';
import cargando from '../assets/cargando.gif';

export const EstadisticasSucursales = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const d3Container = useRef(null);
    const d3GananciasContainer = useRef(null);
    const [sucursales, setSucursales] = useState([]);
    const [intercambios, setIntercambios] = useState({});
    const [ganancias, setGanancias] = useState({});
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');
    const [hayMensaje, setHayMensaje] = useState(false);
    const [mensajeError, setMensajeError] = useState('');
    const [filtrar, setFiltrar] = useState(false);

    const redirectAdminEstadisticas = () => navigate('/admin/estadisticas');

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/sucursales');
                const data = await response.json();
                setSucursales(data);
                fetchIntercambios(data);
                fetchGanancias(data);
            } catch (error) {
                console.error("Error fetching sucursales:", error);
                setLoading(false);
            }
        };

        const fetchIntercambios = async (sucursales) => {
            let intercambiosTemp = {};
            try {
                for (let sucursal of sucursales) {
                    const response = await fetch(`http://localhost:8000/api/filtrarPropuestaIntercambios?nombreSucursal=${encodeURIComponent(sucursal.nombre + " ")}`);
                    let data = await response.json();
                    let realizados;
                    if(filtrar){
                        data = data.filter(intercambio => isDateInRange(intercambio.fecha,fechaInicio,fechaFin));
                        realizados = data.filter(intercambio => intercambio.estado === 'realizado').length;
                       }else{
                        realizados = data.filter(intercambio => intercambio.estado === 'realizado').length;
                       }   
                    intercambiosTemp[sucursal.nombre] = {
                        total: data.length, // cantidad total de intercambios por sucursal
                        realizados: realizados // cantidad de intercambios realizados por sucursal
                    };
                    console.log(intercambiosTemp);
                }
                setIntercambios(intercambiosTemp);

            } catch (error) {
                console.error("Error fetching intercambios:", error);
            }
            setLoading(false);
        };

        const fetchGanancias = async (sucursales) => {
            try {
                const response = await fetch('http://localhost:8000/api/productoCompra');
                let productos = await response.json();
                let gananciasTemp = {};

                for (let sucursal of sucursales) {
                    gananciasTemp[sucursal.nombre] = 0;
                }
                console.log(productos[0].fecha);
                if(filtrar){
                    productos = productos.filter(producto => isDateInRange(producto.fecha,fechaInicio,fechaFin));
                    console.log(productos);
                }
                productos.forEach(producto => {
                    const { nombreSucursal, precio } = producto;
                    gananciasTemp[nombreSucursal] += precio;
                });

                console.log(gananciasTemp);
                setGanancias(gananciasTemp);
            } catch (error) {
                console.error("Error fetching ganancias:", error);
            }
        };

        fetchSucursales();
    }, [filtrar]);

    useEffect(() => {
        if (d3Container.current) {
            d3.select(d3Container.current).selectAll("*").remove();
        }
        if (!loading && d3Container.current) {
            // Ajustes de margen, ancho y alto
            const margin = { top: 60, right: 30, bottom: 190, left: 50 },
                width = 460 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            // Añade el SVG al contenedor
            const svg = d3.select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top + 100})`);

            // Datos de la base de datos
            const data = Object.keys(intercambios).map(key => ({
                sucursal: key,
                total: intercambios[key].total,
                realizados: intercambios[key].realizados
            }));

            // Colores para las barras
            const colorScale = d3.scaleOrdinal()
                .domain(["total", "realizados"])
                .range(["#1f77b4", "#ff7f0e"]);

            // Escala para el eje X (sucursales)
            const x0 = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.1)
                .domain(data.map(d => d.sucursal));

            const x1 = d3.scaleBand()
                .padding(0.05)
                .domain(["total", "realizados"])
                .rangeRound([0, x0.bandwidth()]);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x0))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // Escala para el eje Y (valores)
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => Math.max(d.total, d.realizados))])
                .range([height, 0]);

            svg.append("g")
                .call(d3.axisLeft(y).ticks(7)); //Limita el eje y a 7 elementos

            // Barras para total de intercambios y realizados
            const sucursal = svg.selectAll(".sucursal")
                .data(data)
                .enter().append("g")
                .attr("class", "sucursal")
                .attr("transform", d => `translate(${x0(d.sucursal)},0)`);

            sucursal.selectAll("rect")
                .data(d => [{ key: "total", value: d.total }, { key: "realizados", value: d.realizados }])
                .enter().append("rect")
                .attr("x", d => x1(d.key))
                .attr("y", d => y(d.value))
                .attr("width", x1.bandwidth())
                .attr("height", d => height - y(d.value))
                .attr("fill", d => colorScale(d.key));

            // Datos de la leyenda
            const leyendaDatos = [
                { color: colorScale("total"), nombre: "Total" },
                { color: colorScale("realizados"), nombre: "Concretados" }
            ];

            // Agregar grupo para la leyenda
            const leyenda = svg.append("g")
                .attr("class", "leyenda")
                .attr("transform", "translate(" + (width - 100) + ",0)"); // Ajusta la posición

            // Rectángulos y texto para leyendas con colores
            leyendaDatos.forEach((d, i) => {
                leyenda.append("rect")
                    .attr("x", 0)
                    .attr("y", i * 20) // Ajusta la separación entre elementos
                    .attr("width", 18)
                    .attr("height", 18)
                    .style("fill", d.color);

                leyenda.append("text")
                    .attr("x", 24)
                    .attr("y", i * 20 + 9) // Ajusta para alinear con el centro del rectángulo
                    .attr("dy", ".35em") // Centrado vertical
                    .text(d.nombre)
                    .style("text-anchor", "start")
                    .style("font-size", "12px");
            });
        }
    }, [loading, intercambios]);

    useEffect(() => {
        if (d3GananciasContainer.current) {
            d3.select(d3GananciasContainer.current).selectAll("*").remove();
        }
        if (!loading && d3GananciasContainer.current) {
            const margin = { top: 60, right: 30, bottom: 190, left: 50 },
                width = 460 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            const svg = d3.select(d3GananciasContainer.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const data = Object.keys(ganancias).map(key => ({
                sucursal: key,
                ganancia: ganancias[key]
            }));

            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.sucursal))
                .padding(0.2);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.ganancia)])
                .range([height, 0]);

            svg.append("g")
                .call(d3.axisLeft(y).ticks(7));//Limita el eje y a 7 elementos

            svg.selectAll("bars")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => x(d.sucursal))
                .attr("y", d => y(d.ganancia))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.ganancia))
                .attr("fill", "#d04a35");
        }
    }, [loading, ganancias]);

    const chequearFecha = () => {
        const hoy = new Date().toISOString().split('T')[0];
        if (fechaInicio == '' || fechaFin == '') {
            setMensajeError('Por favor, ingrese fechas.');
            return false;
        }
        if (fechaInicio > fechaFin) {
            setMensajeError('La fecha de inicio no puede ser futura a la fecha de fin.');
            return false;
        }
        if (fechaInicio > hoy || fechaFin > hoy) {
            setMensajeError('No puede ingresar fechas futuras.');
            return false;
        }
        return true;
    }

    const aplicarFiltro = () => {
        if (chequearFecha()) {
            // aca hay que hacer que se filtren las estadísticas
            console.log("hola");
            setFiltrar(true);
            setMensajeError('');
        }
    }

    const borrarFiltro = () => {
        setMensajeError('');
        setFechaFin('');
        setFechaInicio('');
        setFiltrar(false);

    }
    function isDateInRange(dateString, startDateString, endDateString) {
        //console.log(dateString,startDateString,endDateString);
        const date = new Date(dateString);
        const startDate = new Date(startDateString);
        const endDate = new Date(endDateString);
        
        // Set the time to the beginning of the day for start and end dates
        startDate.setUTCHours(0, 0, 0, 0);
        endDate.setUTCHours(23, 59, 59, 999);
        console.log(date >= startDate && date <= endDate);
        return date >= startDate && date <= endDate;
    }
    return (
        <>
            {role === 'admin' ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='titulos titulo-propuestas' style={{ marginTop: '0px' }}>
                        <h1>Estadísticas - Sucursales</h1>
                        <h2 style={{ color: '#242465' }}> Intercambios realizados por sucursal</h2>
                        <h2 style={{ color: '#439ac8' }}> Filtrado por fecha: </h2>
                        <h4 style={{ color: '#439ac8' }}> Fecha de inicio: </h4>
                        <input type="date" style={{ width: '30%' }}
                            value={fechaInicio}
                            onChange={e => setFechaInicio(e.target.value)}
                        />
                        <h4 style={{ color: '#439ac8' }}> Fecha de fin: </h4>
                        <input type="date" style={{ width: '30%' }}
                            value={fechaFin}
                            onChange={e => setFechaFin(e.target.value)}
                        />
                        <div style={{ display: 'flex' }}>
                            <button type="button" className="btn btn-primary" style={{ width: '30%', margin: '5px', marginLeft: '0' }} onClick={aplicarFiltro}> Filtrar </button>
                            <button type='button' className='btn btn-danger' style={{ width: '30%', margin: '5px' }} onClick={borrarFiltro}> Borrar filtros</button>
                        </div>
                        <p className='textoRedireccion' onClick={redirectAdminEstadisticas} style={{ position: 'relative', top: '0' }}> Volver a estadísticas </p>
                        <p className="card-text" style={{ position: 'relative', top: '0' }}><small className="text-body-secondary"> Total: todos los intercambios sin importar el estado. </small></p>
                        {mensajeError ? <p className='errorContainer' style={{ position: 'relative', top: '0', alignSelf: 'auto' }}> {mensajeError} </p> : <> </>}
                        {loading ? <img src={cargando} width='10%' height='10%' /> : <svg ref={d3Container}></svg>}
                        <h2 style={{ color: '#242465' }} >Ganancias por sucursal</h2>
                        {loading ? <img src={cargando} width='10%' height='10%' /> : <svg ref={d3GananciasContainer}></svg>}
                    </div>
                </div>
                : <> <Mantenimiento> </Mantenimiento></>}
        </>
    );
}