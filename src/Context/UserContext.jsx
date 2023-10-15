import axios from "axios";
import { createContext, useState } from "react";

export const UserContext = createContext(0)

export default function UserContextProvider({ children }) {

    let [token, setToken] = useState(localStorage.getItem('userToken'))

    async function SendDataToSignup(values) {
        let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
        return data
    }

    function Logout() {
        localStorage.removeItem('userToken');
        setToken(null)
      }


    async function SendDataToLogin(values) {
        let { data } = await axios.post(`https://note-sigma-black.vercel.app/api/v1/users/signIn`, values)
        return data
    }
    return <UserContext.Provider value={{ SendDataToSignup, SendDataToLogin, setToken, token ,Logout }}>
        {children}
    </UserContext.Provider>
}