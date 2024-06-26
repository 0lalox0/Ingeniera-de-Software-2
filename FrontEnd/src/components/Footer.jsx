import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const redirectSoporte = () => navigate('/soporte');

    const redirectContacto = () => navigate('/contacto');

    const redirectTerminos = () => navigate('/terminos');

    return (
        <footer>
            <div className='menuOpciones'>
                <ul>
                    <li onClick={redirectContacto}> Contacto</li>
                    <li onClick={redirectSoporte}> Soporte</li>
                    <li onClick={redirectTerminos}> Términos y Condiciones</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer