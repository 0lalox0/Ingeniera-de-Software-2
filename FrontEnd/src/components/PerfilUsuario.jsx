import React from 'react'
import useUser from '../hooks/useUser';
import userIcon from '../assets/user-icon.jpg'
import productos from '../assets/productos.jpg'
import intercambio from '../assets/intercambio.png'

export const PerfilUsuario = () => {
    const user = useUser();

    return (
        <>
        { user ?
            <div className='perfilUsuario'>
                <h1> Bienvenido a tu perfil, nombreUsuario</h1>
                <div className='card-container'>
                    <div className="card">
                        <img src={userIcon} alt="" />
                        <div className="card-content">
                            <h3> Mis datos</h3>
                            <p> Acá vas a poder ver y modificar tus datos. </p>
                            <button> Modificar</button>
                        </div>
                    </div>

                    <div className="card">
                        <img src={productos} alt="" />
                        <div className="card-content">
                            <h3> Mis productos</h3>
                            <p> Acá vas a poder toda la información relacionada con tus productos.</p>
                            <button> Administrar </button>
                        </div>
                    </div>

                    <div className="card">
                        <img src={intercambio} alt="" />
                        <div className="card-content">
                            <h3> Mis intercambios</h3>
                            <p> Acá vas a poder toda la información relacionada con tus intercambios.</p>
                            <button> Administrar </button>
                        </div>
                    </div>

                </div>
            </div>
        : <> 
            <h1> No has iniciado sesión.</h1>
        </>
        }
        </>
    )
}
