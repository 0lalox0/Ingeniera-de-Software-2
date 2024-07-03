import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import * as d3 from 'd3';
import cargando from '../assets/cargando.gif';

export const EstadisticasCategorias = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const d3Container = useRef(null);
    const [intercambios, setIntercambios] = useState({});

    const redirectAdminEstadisticas = () => navigate('/admin/estadisticas');

    useEffect(() => {
        const fetchIntercambios = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/propuestaIntercambio');
                let data = await response.json();
                const intercambiosConCategoria = await Promise.all(data.map(async (intercambio) => {
                    const responseProducto = await fetch(`http://localhost:8000/api/prodIntercambios/${intercambio.productoOfrecido}`);
                    const producto = await responseProducto.json();
                    return { ...intercambio, categoria: producto.categoria };// Devuelve intercambio y agrega el campo 'categoria'
                }));
                setIntercambios(intercambiosConCategoria);
                setLoading(false);
            } catch (error) {
                console.error('Error en fetch de intercambios:', error);
                setLoading(false);
            }
        };
        fetchIntercambios();

    }, []);

    useEffect(() => {
        if (!loading && d3Container.current) {
            // Ajustes de margen, ancho y alto
            const margin = { top: 60, right: 30, bottom: 190, left: 50 },
                width = 460 - margin.left - margin.right,
                height = 400 - margin.top - margin.bottom; // Ajuste en altura para mejor visualización

            // Añade el SVG al contenedor
            const svg = d3.select(d3Container.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Preparación de los datos
            const categorias = intercambios.reduce((acc, intercambio) => {
                const { categoria, estado } = intercambio;
                if (!acc[categoria]) {
                    acc[categoria] = { total: 0, realizados: 0 };
                }
                acc[categoria].total += 1;
                if (estado === 'realizado') {
                    acc[categoria].realizados += 1;
                }
                return acc;
            }, {});

            const data = Object.keys(categorias).map(key => ({
                categoria: key,
                ...categorias[key]
            }));

            // Colores para las barras
            const colorScale = d3.scaleOrdinal()
                .domain(["total", "realizados"])
                .range(["#1f77b4", "#ff7f0e"]);

            // Escala para el eje X (categorias)
            const x0 = d3.scaleBand()
                .rangeRound([0, width])
                .paddingInner(0.1)
                .domain(data.map(d => d.categoria));

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
                .call(d3.axisLeft(y).ticks(7)); // Limita el eje y a 7 elementos

            // Barras para total de intercambios y realizados
            const categoria = svg.selectAll(".categoria")
                .data(data)
                .enter().append("g")
                .attr("class", "categoria")
                .attr("transform", d => `translate(${x0(d.categoria)},0)`);

            categoria.selectAll("rect")
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

    return (
        <>
            {role === 'admin' ?
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className='titulos titulo-propuestas' style={{ marginTop: '0px' }}>
                        <h1>Estadísticas - Categorías</h1>
                        <p style={{ position: 'relative', top: '0', alignSelf: 'auto' }} className='textoRedireccion' onClick={redirectAdminEstadisticas}> Volver a estadísticas</p>
                        <h2 style={{ color: '#439ac8' }}>Intercambios por categoría: </h2>
                        <p className="card-text" style={{ position: 'relative', top: '0' }}><small className="text-body-secondary"> Total: todos los intercambios sin importar el estado. </small></p>
                        {loading ? <img src={cargando} width='10%' height='10%' /> : <svg ref={d3Container}></svg>}
                    </div>
                </div>
                : <> <Mantenimiento> </Mantenimiento></>}
        </>
    );
};