import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import * as d3 from 'd3';

export const EstadisticasSucursales = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const d3Container = useRef(null);
    const [sucursales, setSucursales] = useState([]);
    const [intercambios, setIntercambios] = useState({});

    const redirectAdminEstadisticas = () => navigate('/admin/estadisticas');

    useEffect(() => {
        const fetchSucursales = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/sucursales');
                const data = await response.json();
                setSucursales(data);
                fetchIntercambios(data);
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
                    const data = await response.json();

                    const realizados = data.filter(intercambio => intercambio.estado === 'realizado').length;
                    intercambiosTemp[sucursal.nombre] = {
                        total: data.length, // cantidad total de intercambios por sucursal
                        realizados: realizados // cantidad de intercambios realizados por sucursal
                    };
                }
                setIntercambios(intercambiosTemp);

            } catch (error) {
                console.error("Error fetching intercambios:", error);
            }
            setLoading(false);
        };

        fetchSucursales();
    }, []);

    useEffect(() => {
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
                .call(d3.axisLeft(y));

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

            // Después de agregar las barras al gráfico

            // Datos de la leyenda
            const leyendaDatos = [
                { color: colorScale("total"), nombre: "Total" },
                { color: colorScale("realizados"), nombre: "Concretados" }
            ];

            // Agregar grupo para la leyenda
            const leyenda = svg.append("g")
                .attr("class", "leyenda")
                .attr("transform", "translate(" + (width - 100) + ",0)"); // Ajusta la posición según necesites

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

    return (
        <>
            {role === 'admin' ?
                <div className='clase-propuestas'>
                    <div className='titulos titulo-propuestas'>
                        <h1>Estadísticas - Sucursales</h1>
                        <h2>Intercambios realizados por sucursal</h2>
                        <p className='textoRedireccion' onClick={redirectAdminEstadisticas}> Volver a estadísticas</p>
                    </div>
                    <div>
                        {loading ? <p>Cargando...</p> : <svg ref={d3Container}></svg>}
                    </div>
                </div>
                : <> <Mantenimiento> </Mantenimiento></>}
        </>
    );
};