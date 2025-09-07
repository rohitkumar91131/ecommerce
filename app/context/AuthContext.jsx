"use client"
const { createContext, useState, useContext, useRef } = require("react");

const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const [isLoginPageInTheWindow , setLoginPageInTheWondow] = useState(true);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    const greetedRef = useRef(false);
    return <AuthContext.Provider value={{greetedRef ,isLoginPageInTheWindow , setLoginPageInTheWondow ,isLoggedIn , setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);