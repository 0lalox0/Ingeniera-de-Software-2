import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // Nuevo estado para el rol
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(getAuth(), user => {
            setUser(user);
            if (user) {
                // Asignar el rol en base al correo electrónico del usuario
                let role;
                if (user.email.endsWith('@admin.ferreplus.com')) {
                    role = 'admin';
                } else if (user.email.endsWith('@ferreplus.com')) {
                    role = 'empleado';
                } else {
                    role = 'cliente';
                }
                setRole(role); // Establecer el rol del estado al rol del usuario
            }
            setIsLoading(false);
        });

        return unsubscribe;
    }, []);

    return { user, isLoading, role };
}

export default useUser;