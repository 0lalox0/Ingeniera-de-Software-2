import React from 'react'
import mantenimiento from '../assets/mantenimiento.gif'

export const Mantenimiento = () => {
    return (
        <div>
            <div className='contenedor-imagen'>
                <img src={mantenimiento} alt="" />
                <p style={{ color: "#242465" }}> No tenés permiso para acceder a esta página. </p>
            </div>
        </div>
    )
}
