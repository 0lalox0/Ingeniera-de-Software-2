import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import * as d3 from 'd3';

export const EstadisticasCategorias = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const d3Container = useRef(null);
    const [intercambios, setIntercambios] = useState({});

    const redirectAdminEstadisticas = () => navigate('/admin/estadisticas');

    useEffect(() => {
        fetch('http://localhost:8000/api/prodIntercambios')
            .then(response => response.json())
            .then(data => setIntercambios(data))
            .catch(error => console.error('Error:', error));
    }, []);

    useEffect(() => {

        if (!loading && d3Container.current) {
            console.log(intercambios);
            // Agrupa intercambios por categoria y suma cantidades
            const agrupado = {};
            intercambios.forEach(({ categoria, cantidad }) => {
                if (agrupado[categoria]) {
                    agrupado[categoria] += cantidad;
                } else {
                    agrupado[categoria] = cantidad;
                }
            });
            const datosAgrupados = Object.keys(agrupado).map(categoria => ({
                categoria,
                cantidad: agrupado[categoria]
            }));
            console.log(datosAgrupados);
            // Ajustes de margen, ancho y alto
            const margin = { top: 60, right: 30, bottom: 190, left: 50 },
                width = 460 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            // SVG
            const svg = d3.select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Escala X
            const x = d3.scaleBand()
                .range([0, width])
                .domain(intercambios.map(d => d.categoria))
                .padding(0.1);

            // Escala Y
            const y = d3.scaleLinear()
                .domain([0, d3.max(intercambios, d => d.cantidad)])
                .range([height, 0]);

            // Añade eje X al SVG
            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

            // Añade eje Y al SVG
            svg.append("g")
                .call(d3.axisLeft(y));

            // Barras del gráfico
            svg.selectAll(".bar")
                .data(intercambios)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.categoria))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d.cantidad))
                .attr("height", d => height - y(d.cantidad))
                .attr("fill", "#69b3a2");

        }
    }, [loading, intercambios]);

    return (
        <>
            {role === 'admin' ?
                <div className='clase-propuestas'>
                    <div className='titulos titulo-propuestas'>
                        <h1>Estadísticas - Categorías</h1>
                        <h2>Intercambios publicados por categoría</h2>
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