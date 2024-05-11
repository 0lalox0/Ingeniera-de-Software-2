import React, { useState } from 'react'

export const AgregarSucursal = () => {
    const [nombre, setNombre] = useState("");
    const [ciudad, setCiudad] = useState("");
    const [calle, setCalle] = useState("");
    const [numero, setNumero] = useState("");
    const [horarioApertura, setHorarioApertura] = useState("");
    const [horarioCierre, setHorarioCierre] = useState("");
    const [message, setMessage] = useState(""); // Nuevo estado para el mensaje

    const agregarSucursal = async () => {
        try {
            const response = await fetch('http://localhost:8000/sucursales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre,
                    ciudad,
                    calle,
                    numero,
                    horarioApertura,
                    horarioCierre
                })
            });
            const data = await response.json();
            console.log(data);
            setMessage("Sucursal agregada con éxito!"); // Establecer mensaje de éxito
        } catch (error) {
            setMessage("Hubo un error al agregar la sucursal."); // Establecer mensaje de error
        }
    }

    return (
        <div>
            <form onSubmit={(e) => {
                e.preventDefault();
                agregarSucursal();
            }}>
                <input type="text" placeholder="Nombre de la sucursal" value={nombre} onChange={e => setNombre(e.target.value)} />
                <input type="text" placeholder="Ciudad" value={ciudad} onChange={e => setCiudad(e.target.value)} />
                <input type="text" placeholder="Calle" value={calle} onChange={e => setCalle(e.target.value)} />
                <input type="text" placeholder="Número" value={numero} onChange={e => setNumero(e.target.value)} />
                <input type="text" placeholder="Horario de apertura" value={horarioApertura} onChange={e => setHorarioApertura(e.target.value)} />
                <input type="text" placeholder="Horario de cierre" value={horarioCierre} onChange={e => setHorarioCierre(e.target.value)} />
                <button type="submit">Guardar</button>
            </form>
            <p>{message}</p> {/* Mostrar el mensaje */}
        </div>
    )
}