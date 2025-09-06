"use client"
const { createContext, useState, useContext } = require("react");

const AuthContext = createContext();
export const AuthProvider = ({children}) =>{
    const [isLoginPageInTheWindow , setLoginPageInTheWondow] = useState(true);
    const [isLoggedIn , setIsLoggedIn] = useState(false);
    return <AuthContext.Provider value={{isLoginPageInTheWindow , setLoginPageInTheWondow ,isLoggedIn , setIsLoggedIn}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);