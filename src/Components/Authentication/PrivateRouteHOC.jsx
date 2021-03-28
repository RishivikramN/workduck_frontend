import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../../Contexts/AuthContext";

// PrivateRouteHOC is a higher order component
// that handles the protection of the access to 
// the components with corresponding access tokens 
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