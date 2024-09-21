import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const storedAuth = localStorage.getItem('isAuth');
        if (storedAuth) {
          setIsAuth(JSON.parse(storedAuth));
        }
        setIsLoading(false);
      }, []);
    const navigate = useNavigate();

    async function authUser() {
        try {
            const {data}  = await axios.get("http://localhost:3000/api/users/auth", {
                withCredentials: true,
            });
            if (data.success) {
                setIsAuth(true);
                setUser(data.user);
                localStorage.setItem('isAuth', JSON.stringify(true));
            }
        } catch (error) {
            navigate('/');

            return error;
        }
    }

    async function logOut() {
        try {
            const { data } = await axios.get("http://localhost:3000/api/users/logout", {
                withCredentials: true,
            });

            const isSuccess = data.success;
            if (isSuccess) {
                setIsAuth(false);
                setUser(null);
                localStorage.removeItem('isAuth');

            }
        } catch (error) {
            return error
        }

    }
    useEffect(() => {
        authUser();
    }, []);

    const value = {
        isAuth,
        setIsAuth,
        user,
        logOut,
        setUser,
        isLoading 
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;