import React, { useState } from 'react';
import Modal from 'react-modal';
Modal.setAppElement('#root');

export const InformacionPropuesta = ({ meMandaron, propuesta, realizarIntercambio, idUsuarioOfrecido, updateData, updatePropuestaIntercambio, idUsuarioDeseado }) => {
    const [puntajeElegido, setPuntajeElegido] = useState(0);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [rating, setRating] = useState('');

    const openModal = () => setModalIsOpen(true);

    const closeModal = () => setModalIsOpen(false);

    const sumarPuntos = async (puntaje, idUsuario, tipoUsuario, idPropuesta) => {
        setModalIsOpen(false);
        const response = await fetch(`http://localhost:8000/api/users/${idUsuario}`);
        let data = await response.json();
        if (data.puntos === null)
            data.puntos = puntaje;
        else
            data.puntos = parseFloat(data.puntos) + parseFloat(puntaje);
        if (data.cantidadVotos === null)
            data.cantidadVotos = 1;
        else
            data.cantidadVotos++;
        await updateData(data, idUsuario);
        await updatePropuestaIntercambio(tipoUsuario, idPropuesta);
    };

    Modal.setAppElement('#root');

    return (
        <td>
            {meMandaron ?
                <>
                    {propuesta.estado == 'pendiente' ?
                        <>
                            <p style={{ color: '#439ac8' }}> ¿Te interesa este intercambio? ¡Aceptalo! </p>
                            <button onClick={() => realizarIntercambio(propuesta, 'aceptado')} className="btn btn-success" style={{margin: '5px'}}> Aceptar Intercambio</button>
                            <button onClick={() => realizarIntercambio(propuesta, 'rechazado')} className="btn btn-danger" style={{margin: '5px'}}> Rechazar Intercambio</button>
                        </>
                        :
                        <>
                            {propuesta.estado == 'aceptado' ?
                                <p style={{ color: '#07f717' }}> ¡Has aceptado este intercambio!</p>
                                :
                                <>
                                    {propuesta.estado == 'rechazado' ?
                                        <p style={{ color: 'red' }}> Has rechazado esta propuesta de intercambio.</p>
                                        :
                                        <>
                                            {propuesta.estado == 'realizado' ?
                                                <>
                                                    <p style={{ color: '#07f717' }}> Intercambio realizado.</p>
                                                    {!propuesta.calificoOfrecido ? (
                                                        <button id='botonFecha' className="btn btn-warning" onClick={openModal}> Valorar usuario</button>
                                                    ) : (
                                                        <p style={{ color: '#fcba03' }}> ¡Has calificado al usuario!</p>
                                                    )}
                                                    <Modal
                                                        isOpen={modalIsOpen}
                                                        onRequestClose={closeModal}
                                                        contentLabel="Valorar usuario"
                                                        style={{
                                                            content: {
                                                                width: '150px',
                                                                height: '200px',
                                                                margin: 'auto',
                                                                overflow: 'hidden',
                                                                position: 'fixed',
                                                                top: '50%',
                                                                left: '50%',
                                                                transform: 'translate(30%, -120%)'
                                                            },
                                                        }}
                                                    >
                                                        <form>
                                                            {['1', '2', '3', '4', '5'].map((value) => (
                                                                <div key={value}>
                                                                    <input
                                                                        type="radio"
                                                                        id={`rating-${value}`}
                                                                        name="rating"
                                                                        value={value}
                                                                        checked={rating === value}
                                                                        onChange={(e) => { setPuntajeElegido(e.target.value); setRating(e.target.value); }}
                                                                    />
                                                                    <label htmlFor={`rating-${value}`}>{value}</label>
                                                                </div>
                                                            ))}
                                                        </form>
                                                        <button onClick={() => sumarPuntos(puntajeElegido, idUsuarioOfrecido, 'Ofrecido', propuesta._id)} className='btn btn-warning'>Guardar</button>
                                                    </Modal>
                                                </>
                                                :
                                                <>
                                                    {propuesta.estado == 'norealizado' ? <p style={{ color: 'red' }}> Intercambio cancelado.</p> : null}
                                                </>
                                            }
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </>
                :
                <>
                    <p style={{ color: '#439ac8' }}> Has solicitado este intercambio. </p>
                    {propuesta.estado == 'aceptado' ?
                        <p style={{ color: '#07f717' }}> ¡Han aceptado este intercambio!</p>
                        :
                        <>
                            {propuesta.estado == 'rechazado' ?
                                <p style={{ color: 'red' }}> Han rechazado tu propuesta de intercambio.</p>
                                :
                                <>
                                    {propuesta.estado == 'realizado' ?
                                        <>
                                            <p style={{ color: '#07f717' }}> Intercambio realizado.</p>
                                            {!propuesta.calificoDeseado ? (
                                                <button id='botonFecha' className="btn btn-warning" onClick={openModal}> Valorar usuario</button>
                                            ) : (
                                                <p style={{ color: '#fcba03' }}>¡Has calificado al usuario!</p>
                                            )}
                                            <Modal
                                                isOpen={modalIsOpen}
                                                onRequestClose={closeModal}
                                                contentLabel="Valorar usuario"
                                                style={{
                                                    content: {
                                                        width: '150px',
                                                        height: '200px',
                                                        margin: 'auto',
                                                        overflow: 'hidden',
                                                        position: 'fixed',
                                                        top: '50%',
                                                        left: '50%',
                                                        transform: 'translate(30%, -120%)'
                                                    },
                                                }}
                                            >
                                                <form>
                                                    {['1', '2', '3', '4', '5'].map((value) => (
                                                        <div key={value}>
                                                            <input
                                                                type="radio"
                                                                id={`rating-${value}`}
                                                                name="rating"
                                                                value={value}
                                                                checked={rating === value}
                                                                onChange={(e) => { setPuntajeElegido(e.target.value); setRating(e.target.value); }}
                                                            />
                                                            <label htmlFor={`rating-${value}`}>{value}</label>
                                                        </div>
                                                    ))}
                                                </form>
                                                <button onClick={(event) => sumarPuntos(puntajeElegido, idUsuarioDeseado, 'Deseado', propuesta._id)} className='btn btn-warning'>Guardar</button>
                                            </Modal>

                                        </>
                                        :
                                        <>
                                            {propuesta.estado == 'norealizado' ? <p style={{ color: 'red' }}> Intercambio cancelado. </p> : <p style={{ color: '#439ac8' }}> La propuesta todavía no ha sido considerada.</p>}
                                        </>
                                    }
                                </>
                            }
                        </>
                    }
                </>
            }
        </td>
    )
}
