import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import * as d3 from 'd3';

export const EstadisticasEmpleados = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const d3GananciasContainer = useRef(null);
    const d3IntercambiosContainer = useRef(null);
    const [comprasPorEmpleado, setComprasPorEmpleado] = useState({});

    const redirectAdminEstadisticas = () => navigate('/admin/estadisticas');

    useEffect(() => {
        const fetchCompras = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/productoCompra');
                let data = await response.json();
                const comprasPorEmpleadoConNombre = await Promise.all(data.map(async (compra) => {
                    const responseEmpleado = await fetch(`http://localhost:8000/api/empleadosId/${compra.idEmpleado}`);
                    const empleado = await responseEmpleado.json();
                    return { ...compra, nombreEmpleado: empleado.nombre, apellidoEmpleado: empleado.apellido }
                }));
                // Agrupar las compras por idEmpleado y contarlas
                const comprasAgrupadasPorEmpleado = comprasPorEmpleadoConNombre.reduce((acc, compra) => {
                    if (!acc[compra.idEmpleado]) {
                        acc[compra.idEmpleado] = {
                            compras: [], totalCompras: 0, nombreCompleto: `${compra.nombreEmpleado} ${compra.apellidoEmpleado}`
                        };
                    }
                    acc[compra.idEmpleado].compras.push(compra);
                    acc[compra.idEmpleado].totalCompras += 1; //Sumo 1 por cada compra
                    return acc;
                }, {});
                setComprasPorEmpleado(comprasAgrupadasPorEmpleado);
                setLoading(false);
            } catch (error) {
                console.error("Error al cargar las compras:", error);
                setLoading(false);
            }
        };
        fetchCompras();
    }, []);

    useEffect(() => {
        if (!loading && d3GananciasContainer.current) {
            const margin = { top: 60, right: 30, bottom: 190, left: 50 },
                width = 460 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            const svg = d3.select(d3GananciasContainer.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            // Transforma el objeto de compras para sumar los precios por apellido de empleado
            const gananciasPorApellido = {};
            Object.values(comprasPorEmpleado).forEach(grupoCompras => {
                grupoCompras.compras.forEach(({ precio, apellidoEmpleado, nombreEmpleado }) => {
                    const nombreCompleto = ` ${nombreEmpleado} ${apellidoEmpleado}`;
                    if (!gananciasPorApellido[nombreCompleto]) {
                        gananciasPorApellido[nombreCompleto] = 0;
                    }
                    gananciasPorApellido[nombreCompleto] += precio;
                });
            });

            const data = Object.keys(gananciasPorApellido).map(apellido => ({
                apellidoEmpleado: apellido,
                ganancia: gananciasPorApellido[apellido]
            }));

            data.sort((a, b) => a.ganancia - b.ganancia).slice(0, 5);

            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.apellidoEmpleado))
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
                .call(d3.axisLeft(y).ticks(7));

            svg.selectAll("bars")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => x(d.apellidoEmpleado))
                .attr("y", d => y(d.ganancia))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.ganancia))
                .attr("fill", "#d04a35");
        }
    }, [loading, comprasPorEmpleado]);

    useEffect(() => {
        if (!loading && d3IntercambiosContainer.current) {
            const margin = { top: 60, right: 30, bottom: 190, left: 50 },
                width = 460 - margin.left - margin.right,
                height = 350 - margin.top - margin.bottom;

            const svg = d3.select(d3IntercambiosContainer.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const data = Object.keys(comprasPorEmpleado).map(key => ({
                apellidoEmpleado: comprasPorEmpleado[key].nombreCompleto,
                total: comprasPorEmpleado[key].totalCompras
            }));

            data.sort((a, b) => a.total - b.total).slice(0, 5);

            const x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(d => d.apellidoEmpleado))
                .padding(0.2);

            svg.append("g")
                .attr("transform", `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            const y = d3.scaleLinear()
                .domain([0, d3.max(data, d => d.total)])
                .range([height, 0]);

            svg.append("g")
            .call(d3.axisLeft(y).ticks(data.length).tickFormat(d3.format("d")));

            svg.selectAll("bars")
                .data(data)
                .enter()
                .append("rect")
                .attr("x", d => x(d.apellidoEmpleado))
                .attr("y", d => y(d.total))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(d.total))
                .attr("fill", "#d04a35");
        }
    }, [loading, comprasPorEmpleado]);

    return (
        <>
            {role === 'admin' ?
                <div className='clase-propuestas'>
                    <div className='titulos titulo-propuestas' style={{ marginTop: '0px' }}>
                        <h1>Estadísticas - Empleados</h1>
                        <h2>Top 5 con más ganancias registradas</h2>
                        <p className='textoRedireccion' onClick={redirectAdminEstadisticas}> Volver a estadísticas</p>
                    </div>
                    <div style={{ marginTop: '150px' }}>
                        {loading ? <p>Cargando...</p> : <svg ref={d3GananciasContainer}></svg>}
                    </div>
                    <div className='titulos titulo-propuestas' style={{ marginTop: '400px' }}>
                        <h2>Top 5 con más intercambios registrados</h2>
                    </div>
                    <div style={{ marginTop: '0px' }}>
                        {loading ? <p>Cargando...</p> : <svg ref={d3IntercambiosContainer}></svg>}
                    </div>
                </div>
                : <> <Mantenimiento> </Mantenimiento></>}
        </>
    );
};