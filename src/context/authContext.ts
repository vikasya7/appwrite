import { createContext } from "react";


export const AuthContext=createContext<{
    authStatus:boolean,
    setAuthStatus:(status:boolean)=>void;
}>({
    authStatus:false,
    setAuthStatus(status) {},
})


export const AuthProvider =AuthContext.Provider;


export default AuthContext