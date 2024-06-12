import React, { useEffect, useRef, useState } from 'react';
import useUser from '../hooks/useUser';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const ElegirProducto = () => {
    const { role } = useUser();
    const email = localStorage.getItem('email');
    const navigate = useNavigate();
    const [intercambios, setIntercambios] = useState([]);
    const [mensajeEleccion, setMensajeEleccion] = useState('');
    const [eleccion, setEleccion] = useState(false);
    const refMensaje = useRef(null);
    const idDeseado = useParams().id;
    const [idOfrecido, setIdOfrecido] = useState(false);
    const categoriaDeseado = localStorage.getItem('categoria');
    let fecha = localStorage.getItem("date");

    useEffect(() => {
        fetch('http://localhost:8000/api/prodIntercambiosPorUsuario/' + email)
            .then(response => response.json())
            .then(data => setIntercambios(data))
            .catch(error => console.error('Error:', error));
    }, []);

    const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');

    const botonElegir = (idIntercambio, idUsuario) => {
        setEleccion(idIntercambio);
        setIdOfrecido(idUsuario);
        setMensajeEleccion('¿Estás seguro de querer elegir este producto para intercambiar?');
        refMensaje.current.style.color = 'black';
    }

    const botonCancelar = () => {
        setEleccion(null);
        setMensajeEleccion('No se ha elegido el producto para intercambiar.');
        refMensaje.current.style.color = 'red';
    }

    const botonConfirmar = async (id, categoria) => {
        if (categoriaDeseado !== categoria) {
            setMensajeEleccion('El producto que selecciones debe ser de la misma categoría del producto deseado.');
            setEleccion(null);
            refMensaje.current.style.color = 'red';
            return;
        }

        fetch("http://localhost:8000/api/prodIntercambios/" + idDeseado, {})
            .then(res => {
                return res.json();
            })
            .then(data => {
                fetch("http://localhost:8000/api/propuestaIntercambio", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productoOfrecido: eleccion,
                        productoDeseado: idDeseado,
                        usuarioOfrecido: idOfrecido,
                        usuarioDeseado: data.idUsuario,
                        nombreSucursal: data.nombreSucursal,
                        fecha: fecha
                    })
                })
                    .then(response => {
                        if (!response.ok)
                            throw new Error('Error al elegir el producto.');
                        setMensajeEleccion('Propuesta enviada con éxito.');
                        refMensaje.current.style.color = '#07f717';
                        setEleccion(null);
                        return response.json();
                    })
                    .catch(error => {
                        setMensajeEleccion('Hubo un error al elegir el producto.');
                    });
            })
            .catch(error => {
                console.error('Hubo un problema con la solicitud:', error);
            });
    }

    return (
        <>
            {role === 'cliente' ?
                <>
                    <div className='eleccion-productos'>
                        <h1 style={{ color: "#242465" }}> Elegir productos para intercambiar </h1>
                        <p ref={refMensaje}> {mensajeEleccion} </p>
                    </div>
                    {intercambios.length > 0 ?
                        <div className='clase-eleccion'>
                            <table className="table table-hover align-middle ">
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
                                        if (intercambio.estado !== 'libre') {
                                            return null;
                                        }
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
                                                    {eleccion === intercambio._id ? (
                                                        <>
                                                            <div style={{ display: 'flex',textAlign: 'center', justifyContent: 'center' }}>
                                                                <button onClick={() => botonConfirmar(intercambio._id, intercambio.categoria)} className='btn btn-success'> Confirmar </button>
                                                                <button onClick={botonCancelar} id='eleccionCancelar'>Cancelar</button>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <button onClick={() => botonElegir(intercambio._id, intercambio.idUsuario)} className='btn btn-success'>Elegir</button>
                                                    )}
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        : <>
                            <p> No has publicado ningún producto para intercambiar.</p>
                            <button onClick={redirectAgregar} className="btn btn-success"> Publicar producto para intercambiar</button>
                        </>}
                </>
                :
                <>
                </>}
        </>
    )
}