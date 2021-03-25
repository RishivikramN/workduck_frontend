import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

export default function PrivateRouteHOC({component:Component , ...restprops}){
    const {currentUser} = useAuth();
    return (
        <Route
        {...restprops}
        render={
            props=> { return currentUser ? <Component {...props}/> : <Redirect to="/login"/>}
        }
        >

        </Route>
    )
}