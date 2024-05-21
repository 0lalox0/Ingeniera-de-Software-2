import React, { useEffect, useRef, useState } from 'react';
import useUser from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';


export const EliminarIntercambio = () => {
    const { role } = useUser();
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [intercambios, setIntercambios] = useState([]);
    const [mensajeEliminar, setMensajeEliminar] = useState('');
    const [eliminar, setEliminar] = useState(false);
    const refMensaje = useRef(null);

    useEffect(() => {
        fetch('http://localhost:8000/api/prodIntercambiosPorUsuario/' + email)
            .then(response => response.json())
            .then(data => setIntercambios(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const redirectGestion = () => navigate('/perfilUsuario/intercambios');

    const buscarProducto = (idProducto) => {
        return intercambios.find((intercambio) => intercambio._id == idProducto);
    }

    const botonEliminar = (idIntercambio) => {
        setEliminar(idIntercambio);
        setMensajeEliminar('¿Estás seguro de querer borrar este producto para intercambiar?');
        refMensaje.current.style.color = 'red';
    }

    const botonCancelar = () => {
        setEliminar(null);
        setMensajeEliminar('No se ha borrado el producto para intercambiar.');
        refMensaje.current.style.color = 'black';
    }

    const botonConfirmar = async (idProducto) => {
        setEliminar(null);
        refMensaje.current.style.color = 'red';
        let productoEliminar = buscarProducto(idProducto);
        try {
            const url = `http://localhost:8000/api/prodintercambios/${idProducto}`;
            const options = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await fetch(url, options);
            if (!response.ok)
                throw new Error('Error al eliminar el producto.');
        } catch (error) {
            setMensajeEliminar('Hubo un error al eliminar el producto.');
            return;
        }
        setMensajeEliminar(`Se ha eliminado el producto con título ${productoEliminar.titulo} de la categoría ${productoEliminar.categoria}`);
        setIntercambios(intercambios.filter((intercambio) => intercambio._id != idProducto));
    }

    return (
        <>
            {role === 'cliente' ?
                <>
                    <div className='eliminacion-sucursales'>
                        <h1 style={{ color: "#242465" }}> Eliminar productos para intercambiar </h1>
                        <p className='textoRedireccion' onClick={redirectGestion}> Volver a la gestión de intercambios</p>
                        <p ref={refMensaje}> {mensajeEliminar}</p>
                    </div>
                    <div className='clase-sucursales'>
                        <table className="table table-hover align-middle " id='tablaSucursalesEliminar'>
                            <thead>
                                <tr>
                                    <th style={{ color: "#242465" }} scope="col"> Título </th>
                                    <th style={{ color: "#242465" }} scope="col"> Descripción </th>
                                    <th style={{ color: "#242465" }} scope="col"> Categoría </th>
                                    <th style={{ color: "#242465" }} scope="col"> Sucursal </th>
                                    <th style={{ color: "#242465" }} scope="col"> Rango horario </th>
                                    <th style={{ color: "#242465" }} scope="col"> Foto </th>
                                    <th style={{ color: "#242465" }} scope="col"> Gestionar </th>
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {intercambios.map((intercambio) => {
                                    return (
                                        <tr key={intercambio._id}>
                                            <td>{intercambio.titulo}</td>
                                            <td>{intercambio.descripcion}</td>
                                            <td>{intercambio.categoria}</td>
                                            <td>{intercambio.nombreSucursal}</td>
                                            <td>{intercambio.inicioRango} - {intercambio.finRango}</td>
                                            <td>
                                                <img src={intercambio.urlFotos[0]} width='80px' height='60px' />
                                            </td>
                                            <td>
                                                {eliminar === intercambio._id ? (
                                                    <>
                                                        <button onClick={() => botonConfirmar(intercambio._id)} className='botonEliminar'> Confirmar </button>
                                                        <button onClick={botonCancelar}>Cancelar</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => botonEliminar(intercambio._id)} className='botonEliminar'>Eliminar producto </button>
                                                )}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </>
                :
                <>
                </>}
        </>
    )
}
