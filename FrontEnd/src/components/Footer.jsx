import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    const navigate = useNavigate();

    const redirectSoporte = () => navigate('/soporte');

    const redirectContacto = () => navigate('/contacto');

    const redirectTerminos = () => navigate('/terminos');

    const redirectPreguntas = () => navigate('/preguntas');

    const isActive = (path) => {
        return location.pathname === path;
    }

    const getTop = {
        top: location.pathname == '/preguntas'  || location.pathname == '/registrarse' ? '150%' : 
            location.pathname == '/contacto' ? '120%' : '100%'
    }

    return (
        <footer style={getTop}>
            <div className='menuOpciones menuFooter'>
                <ul>
                    <li onClick={redirectContacto} className={isActive('/contacto') ? 'paginaActiva' : ''}> Contacto</li>
                    <li onClick={redirectSoporte} className={isActive('/soporte') ? 'paginaActiva' : ''}> Soporte</li>
                    <li onClick={redirectPreguntas} className={isActive('/preguntas') ? 'paginaActiva' : ''}> Preguntas frecuentes</li>
                    <li onClick={redirectTerminos} className={isActive('/terminos') ? 'paginaActiva' : ''}> Términos y Condiciones</li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer