import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    async function authUser() {
        try {
    console.log("authhhh")

            const {data}  = await axios.get("http://localhost:3000/api/users/auth", {
                withCredentials: true,
            });
            console.log(data)
            if (data.success) {
                setIsAuth(true);
                setUser(data.user);
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
            }
        } catch (error) {
            return error
        }

    }
    useEffect(() => {
        console.log("ggggggggggggggggggggg")
        authUser();
    }, []);

    const value = {
        isAuth,
        setIsAuth,
        user,
        logOut,
        setUser,
    };
    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;