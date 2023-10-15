import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../../Context/UserContext"


export default function ProtectedRoute({ children }) {
    let {token} = useContext(UserContext)
    if (token) {
        return children
    } else {
        return <Navigate to='/login' />
    }
}
