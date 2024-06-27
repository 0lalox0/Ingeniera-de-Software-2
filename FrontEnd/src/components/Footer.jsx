import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const redirectSoporte = () => navigate('/soporte');

    const redirectContacto = () => navigate('/contacto');

    const redirectTerminos = () => navigate('/terminos');

    const isActive = (path) => {
        return location.pathname === path;
    }

    return (
        <footer>
            <div className='menuOpciones'>
                <ul>
                    <li onClick={redirectContacto} className={isActive('/contacto') ? 'paginaActiva' : ''}> Contacto</li>
                    <li onClick={redirectSoporte} className={isActive('/soporte') ? 'paginaActiva' : ''}> Soporte</li>
                    <li onClick={redirectTerminos} className={isActive('/terminos') ? 'paginaActiva' : ''}> Términos y Condiciones</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer