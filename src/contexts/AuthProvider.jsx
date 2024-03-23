import { createContext, useContext, useState, useEffect } from 'react';
import * as usersService from '../utilities/users-service';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await usersService.getUser();
            setUser(user);
        };
        console.log('auth provider: ', user)
        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};