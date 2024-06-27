import React from 'react';
import Footer from './Footer';
import logo from '../assets/logo-titotech.png';

export const Soporte = () => {
    return (
        <>
            <div className="texto">
                <h1> Soporte técnico para Ferreplus Intercambios </h1>
                <p>
                    En Ferreplus Intercambios, nos dedicamos a ofrecer el mejor servicio de soporte técnico para garantizar que tu experiencia de intercambio de productos sea excelente y sin inconvenientes. Nuestro equipo de expertos está siempre listo para asistirte con cualquier consulta o problema técnico que puedas tener.
                    ¿Cómo podemos ayudarte? Tu satisfacción es nuestra prioridad. No dudes en ponerte en contacto con nosotros para cualquier necesidad de soporte técnico. ¡Estamos aquí para ayudarte!
                    Mandanos un e-mail a <a href="mailto:titotechsolution@gmail.com"> titotechsolution@gmail.com </a>
                    explayando el problema que tuviste, el correo electrónico de tu cuenta, nombre y apellido y nuestro equipo va a estar contactándose con vos a la brevedad.
                </p>
                <a href="mailto:titotechsolution@gmail.com">
                    <img src={logo} alt="logoTitoTech" style={{ width: '5rem', height: '5rem' }} />
                </a>
            </div>
            <Footer />
        </>
    )
}
