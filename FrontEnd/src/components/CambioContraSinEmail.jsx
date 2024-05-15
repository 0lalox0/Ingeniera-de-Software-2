import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, EmailAuthProvider, updatePassword, reauthenticateWithCredential } from 'firebase/auth';

export const CambioContraSinEmail = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [cambiar, setCambiar] = useState(true);
    const navigate = useNavigate();

    const redirectInicio = () => {
        navigate('/');
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
        if (currentPassword === e.target.value) {
            setError('La nueva contraseña no puede ser igual a la contraseña actual.');
        } else if (e.target.value !== confirmPassword) {
            setError('La nueva contraseña y la confirmación de la contraseña no coinciden.');
        } else {
            setError('');
        }
    }

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (newPassword !== e.target.value) {
            setError('La nueva contraseña y la confirmación de la contraseña no coinciden.');
        } else {
            setError('');
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            cambiarContra(currentPassword, newPassword);
        }
    }

    const cambiarContra = async (currentPassword, newPassword) => {
        const auth = getAuth();
        const user = auth.currentUser;
        const email = localStorage.getItem("email");
        console.log(email);
        const credential = EmailAuthProvider.credential(email, currentPassword);

        reauthenticateWithCredential(user, credential)
            .then(() => {
                return updatePassword(user, newPassword);
            })
            .then(() => {
                setCambiar(false);
            })
            .catch((error) => {
                setError('Error al reautenticar: ' + error.message);
            });
    }

    return (
        <div className='cambioContra'>
            {cambiar ? (
                <>
                    <h2> Cambiar contraseña</h2>
                    <label className='form-label' htmlFor='inputCurrentPassword'> Contraseña actual: </label>
                    <input type="password" className="form-control" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} id='inputCurrentPassword' onKeyDown={handleKeyDown} />
                    <label className='form-label' htmlFor='inputNewPassword'> Nueva contraseña: </label>
                    <input type="password" className="form-control" value={newPassword} onChange={handleNewPasswordChange} id='inputNewPassword' onKeyDown={handleKeyDown} />
                    <label className='form-label' htmlFor='inputConfirmPassword'> Confirmar nueva contraseña: </label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={handleConfirmPasswordChange} id='inputConfirmPassword' onKeyDown={handleKeyDown} />
                    {error && <p className='errorContainer'> {error} </p>}
                    <button className='search-button' onClick={() => cambiarContra(currentPassword, newPassword)}> Cambiar contraseña </button>                
                </>
            )
                : <>
                    <div className='mensajeExito'>
                        <h2 style={{ color: "#242465" }}> ¡Listo!</h2>
                        <p> Su contraseña ha sido actualizada con exito</p>
                        <p className='textoRedireccion' onClick={redirectInicio}> Volver a inicio </p>
                    </div>
                </>
            }
        </div>
    )
}
