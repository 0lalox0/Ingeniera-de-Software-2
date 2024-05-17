import React from 'react';
import useUser from "../hooks/useUser";

export const Intercambios = () => {
    const { role } = useUser();
    
    return (
        <div className='clase-intercambios'>
            <div className='titulo-intercambios'>
                <h1 style={{ color: "#242465" }}>Productos para intercambiar</h1>
                <>
                    {role === 'cliente' ?
                        <button> Publicar producto para intercambiar</button>
                    : <></>}
                </>
            </div>
        </div>
    )
}
