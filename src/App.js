import { AuthProvider } from "./Contexts/AuthContext";
import SignUp from "./Components/Authentication/SignUp";
import Login from "./Components/Authentication/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRouteHOC from "./Components/Authentication/PrivateRouteHOC";
import DashBoard from "./Components/Screens/Dashboard";


function App() {
  return (
    <Router>
      <AuthProvider>
          <Switch>
            <PrivateRouteHOC exact path="/" component={DashBoard}/>
            {/* Auth Routes */}
            <Route path="/signup" component={SignUp}/>
            <Route path="/login" component={Login}/>
          </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
