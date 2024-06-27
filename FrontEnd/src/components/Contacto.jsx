import React from 'react';
import '../Footer.css';
import Footer from './Footer';
import logo from '../assets/logo-titotech.png';

export const Contacto = () => {
    return (
        <>
            <div className='texto'>
                <h1> ¿Quiénes somos?</h1>
                <p> Somos Tito Tech Solutions, una empresa líder en el mercado especializada en desarrollo web y soluciones digitales innovadoras. Con más de una década de experiencia en el sector, hemos ayudado a diversas empresas a transformar sus ideas en realidades digitales exitosas. Nuestro equipo está compuesto por 4 desarrolladores Full-Stack altamente calificados y apasionados por la tecnología, cada uno con un amplio conocimiento en la creación y mantenimiento de aplicaciones web robustas y escalables.

                    Nos destacamos por nuestra capacidad para adaptarnos a las necesidades específicas de nuestros clientes, brindando soluciones a medida que optimizan sus procesos empresariales y mejoran su presencia en línea. Desde el diseño de interfaces de usuario atractivas y funcionales hasta el desarrollo de sistemas backend seguros y eficientes, nuestro equipo maneja cada aspecto del desarrollo web con una precisión y profesionalismo inigualables.

                    Además, en Tito Tech Solutions valoramos la comunicación abierta y continua con nuestros clientes, asegurando que cada proyecto se lleve a cabo de acuerdo con sus expectativas y objetivos comerciales. Creemos firmemente en el poder de la colaboración y trabajamos de la mano con nuestros clientes para lograr resultados que no solo cumplan, sino que superen sus expectativas.

                </p>
                <h1> Contactate con Tito Tech Solutions</h1>
                <p>
                    Si deseás conocer más sobre nuestros servicios o tenés un proyecto en mente que te gustaría discutir, no dudes en ponerte en contacto con nosotros. Estamos disponibles para consultas y colaboraciones, y podés alcanzarnos fácilmente enviándonos un correo electrónico a
                    <a href="mailto:titotechsolution@gmail.com"> titotechsolution@gmail.com </a>
                    ¡Esperamos con ansias la oportunidad de trabajar juntos y ayudar a tu negocio a crecer en el mundo digital!
                </p>
                <a href="mailto:titotechsolution@gmail.com">
                    <img src={logo} alt="logoTitoTech" style={{ width: '5rem', height: '5rem' }} />
                </a>
            </div>
            <Footer />
        </>
    )
}
