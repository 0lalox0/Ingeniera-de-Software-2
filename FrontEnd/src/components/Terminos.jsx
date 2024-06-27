import React from 'react';
import Footer from './Footer';
import logo from '../assets/logo-titotech.png';

export const Terminos = () => {
    return (
        <>
            <div className="texto">
                <h1> Términos y Condiciones</h1>
                <p>

                    Al utilizar nuestro sitio web, usted acepta cumplir con los siguientes términos y condiciones. Todo el contenido, incluyendo textos, gráficos, logotipos, iconos, imágenes, clips de audio, descargas digitales, compilaciones de datos y software, es propiedad de Tito Tech Solutions y está protegido por leyes internacionales de derechos de autor.
                    Queda estrictamente prohibida la reproducción, distribución, modificación, exhibición pública o cualquier otro uso no autorizado del contenido sin el consentimiento expreso por escrito de Tito Tech Solutions.
                    Nos reservamos el derecho de realizar cambios en estos términos y condiciones en cualquier momento, y es responsabilidad del usuario revisar estos términos regularmente.
                    El uso continuo de Ferreplus Intercambios después de la publicación de cualquier cambio constituirá su aceptación de dichos cambios.
                    Si tiene alguna pregunta o inquietud sobre estos términos y condiciones, no dude en ponerse en contacto con nosotros a través de los canales de soporte proporcionados en nuestro sitio web.
                </p>
                <p style={{ fontSize: 'smaller' }}>  © Tito Tech Solutions 2024.</p>
                <a href="mailto:titotechsolution@gmail.com">
                    <img src={logo} alt="logoTitoTech" style={{ width: '5rem', height: '5rem' }} />
                </a>
            </div>
            <Footer />
        </>
    )
}
