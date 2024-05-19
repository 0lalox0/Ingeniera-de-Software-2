import React from 'react';
import useUser from "../hooks/useUser";
import { useNavigate } from 'react-router-dom';


export const Intercambios = () => {
    const { role } = useUser();
    const navigate = useNavigate();
    const redirectAgregar = () => navigate('/perfilusuario/agregarintercambio');
    
    return (
        <div className='clase-intercambios'>
            <div className='titulo-intercambios'>
                <h1 style={{ color: "#242465" }}>Productos para intercambiar</h1>
                <>
                    {role === 'cliente' ?
                        <button onClick={redirectAgregar}> Publicar producto para intercambiar</button>
                    : <></>}
                </>
            </div>
        </div>
    )
}
