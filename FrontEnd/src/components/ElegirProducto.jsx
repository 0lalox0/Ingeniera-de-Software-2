import React, { useEffect, useRef, useState } from 'react';
import useUser from '../hooks/useUser';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const ElegirProducto = () => {
    const { role } = useUser();
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [intercambios, setIntercambios] = useState([]);
    const [mensajeEliminar, setMensajeEliminar] = useState('');
    const [eliminar, setEliminar] = useState(false);
    const refMensaje = useRef(null);
    const idDeseado = useParams().id;

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

    const botonElegir = (idIntercambio) => {
        setEliminar(idIntercambio);
        setMensajeEliminar('¿Estás seguro de querer elegir este producto para intercambiar?');
    }

    const botonCancelar = () => {
        setEliminar(null);
        setMensajeEliminar('No se ha elegido el producto para intercambiar.');
        refMensaje.current.style.color = 'black';
    }
    const botonConfirmar = async (idProducto) => {
        //alert("test");
        //etEliminar(null);
        console.log(eliminar);
        console.log(idDeseado);
        try {
            const response = await fetch("http://localhost:8000/api/propuestaIntercambio", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    productoOfrecido: eliminar,
                    productoDeseado: idDeseado
                })
            });
            /* const url = `http://localhost:8000/api/propuestaIntercambio`;
             const options = {
                 method: 'POST',
                 headers: {
                     'Content-Type': 'application/json'
                 },
                 body: JSON.stringify({
                     productoOfercido: eliminar,
                     productoDeseado: idDeseado
                 })
             };
             const response = await fetch(url, options);*/
            if (!response.ok)
                throw new Error('Error al eliminar el producto.');
        } catch (error) {
            console.log(error);
            setMensajeEliminar('Hubo un error al eliminar el producto.');
            return;
        }
        // setMensajeEliminar(`Se ha Enviado la Propuesta`);
        // setIntercambios(intercambios.filter((intercambio) => intercambio._id != idProducto));
    }
    /* const botonConfirmar = async (idProducto) => {
         setEliminar(null);
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
     }*/

    return (
        <>
            {role === 'cliente' ?
                <>
                    <div className='eleccion-productos'>
                        <h1 style={{ color: "#242465" }}> Elegir productos para intercambiar </h1>
                        <p className='errorContainer' ref={refMensaje}> {mensajeEliminar}</p>
                    </div>
                    <div className='clase-eleccion'>
                        <table className="table table-hover align-middle " id='tablaSucursalesEliminar'>
                            <thead>
                                <tr>
                                    <th scope="col"> Título </th>
                                    <th scope="col"> Descripción </th>
                                    <th scope="col"> Categoría </th>
                                    <th scope="col"> Sucursal </th>
                                    <th scope="col"> Rango horario </th>
                                    <th scope="col"> Foto </th>
                                    <th scope="col"> Elegir </th>
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
                                                        <button onClick={() => botonConfirmar(intercambio._id)} className='btn btn-success'> Confirmar </button>
                                                        <button onClick={botonCancelar} id='eleccionCancelar'>Cancelar</button>
                                                    </>
                                                ) : (
                                                    <button onClick={() => botonElegir(intercambio._id)} className='btn btn-success'>Elegir</button>
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