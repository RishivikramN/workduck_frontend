import React, { useContext, useState } from 'react';
import axios from "axios";
import { signupEndpoint, signinEndpoint } from "../Config/Endpoints";

const AuthContext = React.createContext();

// useAuth is a Custom Hook that handles 
// all the authentication processes.
export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [currentUser,setCurrentUser] = useState();
    const [token, setToken] = useState("");

    const signUp = async (username,email,password,isAdmin) => {
        const JSONPayload = {
            userName: username,
            emailId : email,
            password,
            isAdmin 
        }
        const response = await axios.post(signupEndpoint, JSONPayload);
        setCurrentUser(response.data);
    }

    const login = async ( email, password) =>{
        const JSONPayload = {
            emailId : email,
            password
        }
        const result = await axios.post(signinEndpoint, JSONPayload);
        setCurrentUser({emailId:email,userName:result.data.username, userId: result.data.userId, isAdmin: result.data.isAdmin});
        
        setToken(result.data.token.toString());
        localStorage.setItem("authtoken",token);
    }

    const logout = () => {
        localStorage.removeItem("authtoken");
        setToken("");
    }

    const value={
        currentUser,
        signUp,
        login,
        logout,
        token
    }
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}