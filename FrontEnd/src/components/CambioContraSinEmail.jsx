import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';
import useUser from '../hooks/useUser';
import { Mantenimiento } from './Mantenimiento';
import Footer from './Footer';

export const CambioContraSinEmail = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [cambiar, setCambiar] = useState(true);
    const navigate = useNavigate();
    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);
    const { role } = useUser();

    const redirectMiPerfil = () => navigate('/perfilusuario');

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            cambiarContra(currentPassword, newPassword);
        }
    }

    const cambiarContra = async (currentPassword, newPassword) => {
        [currentPasswordRef, newPasswordRef, confirmPasswordRef].forEach(label => label.current.style.color = '');
        if (currentPassword === '') {
            setError('Por favor, ingresá tu contraseña actual.');
            currentPasswordRef.current.style.color = 'red';
            return;
        }
        if (newPassword === '') {
            setError('Por favor, ingresá la nueva contraseña.');
            newPasswordRef.current.style.color = 'red';
            return;
        }
        if (confirmPassword === '') {
            setError('Por favor, confirmá tu contraseña.');
            confirmPasswordRef.current.style.color = 'red';
            return;
        }
        if (currentPassword === newPassword) {
            setError('La nueva contraseña no puede ser igual a la contraseña actual.');
            currentPasswordRef.current.style.color = 'red';
            newPasswordRef.current.style.color = 'red';
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('La nueva contraseña y la confirmación de la contraseña no coinciden.');
            newPasswordRef.current.style.color = 'red';
            confirmPasswordRef.current.style.color = 'red';
            return;
        }

        const auth = getAuth();
        const user = auth.currentUser;
        const email = localStorage.getItem("email");
        const credential = EmailAuthProvider.credential(email, currentPassword);
        reauthenticateWithCredential(user, credential)
            .then(() => {
                return updatePassword(user, newPassword);
            })
            .then(() => {
                setCambiar(false);
            })
            .catch((error) => {
                if (error.message.includes("(auth/weak-password)")) {
                    newPasswordRef.current.style.color = 'red';
                    confirmPasswordRef.current.style.color = 'red';
                    setError("Contraseña débil: La nueva contraseña debe tener al menos 6 caracteres.");
                }
                else if (error.message.includes('wrong-password')) {
                    currentPasswordRef.current.style.color = 'red';
                    setError('La contraseña actual ingresada no es correcta.');
                }
                else
                    setError(error.message);
            });
    }

    return (
        <>
            {role === 'cliente' ?
                <>
                    <div className='cambioContra' onKeyDown={handleKeyDown} >
                        {cambiar ? (
                            <>
                                <h2> Cambiar contraseña </h2>
                                <label className='form-label' htmlFor='inputCurrentPassword' ref={currentPasswordRef}> Contraseña actual: </label>
                                <input type="password" className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} id='inputCurrentPassword' />
                                <label className='form-label' htmlFor='inputNewPassword' ref={newPasswordRef}> Nueva contraseña: </label>
                                <input type="password" className="form-control" value={newPassword} onChange={e => setNewPassword(e.target.value)} id='inputNewPassword' />
                                <label className='form-label' htmlFor='inputConfirmPassword' ref={confirmPasswordRef}> Confirmar nueva contraseña: </label>
                                <input type="password" className="form-control" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} id='inputConfirmPassword' />
                                {error && <p className='errorContainer'> {error} </p>}
                                <button className='search-button' onClick={() => cambiarContra(currentPassword, newPassword)}> Cambiar contraseña </button>
                                <p className='textoRedireccion' onClick={redirectMiPerfil}> Volver a Mi Perfil </p>
                            </>
                        )
                            : <>
                                <div className='mensajeExito'>
                                    <h2 style={{ color: "#242465" }}> ¡Listo!</h2>
                                    <p> Su contraseña ha sido actualizada con exito</p>
                                    <p className='textoRedireccion' onClick={redirectMiPerfil}> Volver a Mi Perfil </p>
                                </div>
                            </>
                        }
                    </div>
                <Footer></Footer>
                </>
                : <Mantenimiento></Mantenimiento>}
        </>
    )
}
