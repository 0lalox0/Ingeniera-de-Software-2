import React from 'react';
import useUser from '../hooks/useUser';

export const EliminarIntercambio = () => {
    const { role } = useUser();
    return (
        <>
            {role === 'cliente' ?
                <div> Hola </div>
                : <></>}
        </>
    )
}
