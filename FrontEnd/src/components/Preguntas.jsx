import React from 'react';
import Footer from './Footer';
import logo from '../assets/logo-titotech.png';

export const Preguntas = () => {
    return (
        <>
            <div className="texto preguntas">
                <h1> Preguntas frecuentes de Ferreplus Intercambios</h1>
                <h3> ¿Cómo funcionan los intercambios?</h3>
                <p> En la página
                    <a href="/intercambios"> Intercambios </a>
                    vas a poder ver los intercambios publicados por todos los usuarios de Ferreplus Intercambios.
                    Seleccioná el que más te interese, elegí una fecha en el día elegido por el usuario que publicó el producto, y elegí uno de los productos que vos publicaste para intercambiarlo.
                    Los productos deben ser de la misma categoría.
                    Una vez concretado el intercambio en la sucursal elegida, podrás valorar al usuario con el que intercambiaste.
                </p>
                <h3> ¿Dónde veo la información de los sucursales?</h3>
                <p>
                    En la página
                    <a href="/sucursales"> Sucursales </a>
                    vas a poder ver toda la información en cuanto a todas nuestras sucursales.
                    Todas están abiertas de lunes a viernes en sus horarios correspondientes.
                </p>
                <h3> ¿Qué necesito para crearme una cuenta en Ferreplus Intercambios?</h3>
                <p> Para crear una cuenta te vamos a pedir: nombre, apellido, fecha de nacimiento, mail y contraseña.
                    Para registrarte debes ser mayor de edad. Tu contraseña debe tener más de 5 caracteres.
                    <a href="/registrarse"> ¡Registrate ya!</a>
                </p>
                <h3> Me olvidé la contraseña, ¿cómo la recupero?</h3>
                <p>
                    Si no te acordás tu contraseña, podés ingresar
                    <a href="/cambioContra"> acá </a>
                    donde se va a mandar un mail a tu correo electrónico con los pasos para cambiar la contraseña.
                    Si querés cambiar tu contraseña por motivos de seguridad, lo podes hacer en el apartado Mi Perfil.
                </p>
                <h3> ¿Para qué sirve el sistema de puntuación?</h3>
                <p>
                    El sistema de puntos sirve para que puedas elegir mejor con quién intercambiar productos.
                    Aquellos usuarios que tengan una calificación más alta tendrán más posibilidades de intercambiar sus productos.
                    ¡Procurá ser un buen usuario!
                </p>
                <p style={{ fontSize: 'smaller' }}>  Si tenés alguna otra pregunta no dudes en contactarnos.</p>
                <a href="mailto:titotechsolution@gmail.com">
                    <img src={logo} alt="logoTitoTech" style={{ width: '5rem', height: '5rem' }} />
                </a>
            </div>
            <Footer />
        </>
    )
}
