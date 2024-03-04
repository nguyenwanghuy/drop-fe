import React, { useEffect, useState } from 'react';
import AuthenContext from './AuthenContext';
import authAPI from '../../apis/authAPI';

const AuthState = ({ children }) => {
    const [newPassword, setNewPassword] = useState('')
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: {}
    })
    const handleLogin = async () => {
        try {
           const response = await authAPI.authInfo()
         const data = response.data;
         setAuth({
            isAuthenticated: true,
            user: data.userInfo
         })
        } catch (error) {
            console.log(error)
        }
    }
    const handleLogout = () => {
        setAuth({
            isAuthenticated: false,
            user:{}
        })
    };
    const id = auth.user.id
    const handleUpdatePassword = async () => {
        try {
          const response = await authAPI.updatePassword(`${id}`, {password:newPassword});
          console.log(response);
          const updatedUser = { ...auth.user, password:newPassword}
          console.log(updatedUser,' updated user');
            setAuth({ ...auth, user:updatedUser})
        } catch (error) {
          console.log(error);
        }
      };
    useEffect(()=>{
        const accessToken = localStorage.getItem('accessToken');
       if(accessToken){
        handleLogin();
       }
    },[]);
    return (
        <AuthenContext.Provider
            value={{
                auth,
                handleLogin,
                handleLogout,
                handleUpdatePassword,
                newPassword,
                setNewPassword

            }}>
            {children}
        </AuthenContext.Provider>
    )
}
export default AuthState