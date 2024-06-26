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

    const redirectAdmin = () => navigate('/admin');

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
                    intercambiosTemp[sucursal.nombre] = data.length; // cantidad de intercambios por sucursal
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
            const margin = { top: 60, right: 30, bottom: 190, left: 50 }, // Margen inferior donde estan los nombres de las sucursales
                width = 460 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            // Añade el SVG al contenedor
            const svg = d3.select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top+100})`);

            const data = Object.keys(intercambios).map(key => ({ sucursal: key, value: intercambios[key] }));

            // Escala para el eje X (nombres de las sucursales)
            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.sucursal))
                .padding(0.1);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            // Escala para el eje Y (valores)
            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.value)])
                .range([height, 0]);

            svg.append("g")
                .call(d3.axisLeft(y));

            // Barras
            svg.selectAll(".bar")
                .data(data)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.sucursal))
                .attr("y", d => y(d.value))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.value))
                .attr("fill", "#69b3a2");
        }
    }, [loading, intercambios]);

    return (
        <>
            {role === 'admin' ?
                <div className='clase-propuestas'>
                    <div className='titulos titulo-propuestas'>
                        <h1>Estadísticas - Sucursales</h1>
                        <p className='textoRedireccion' onClick={redirectAdmin}> Volver al perfil</p>
                    </div>
                    <div>
                        {loading ? <p>Cargando...</p> : <svg ref={d3Container}></svg>}
                    </div>
                </div>
                : <> <Mantenimiento> </Mantenimiento></>}
        </>
    );
};