import { AuthProvider } from "./Contexts/AuthContext";
import { TrainProvider } from "./Contexts/TrainContext";
import SignUp from "./Components/Authentication/SignUp";
import Login from "./Components/Authentication/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRouteHOC from "./Components/Authentication/PrivateRouteHOC";
import DashBoard from "./Components/Screens/Dashboard";
import LandingPage from "./Components/Screens/LandingPage";
import TrainBooking from "./Components/Screens/TrainBooking";


function App() {
  return (
    <Router>
      <AuthProvider>
        <TrainProvider>
            <Switch>
              <PrivateRouteHOC exact path="/dashboard" component={DashBoard}/>
              {/* Auth Routes */}
              <Route path='/trainbooking' component={TrainBooking}/>
              <Route path='/' component={LandingPage}/>
              <Route path="/signup" component={SignUp}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </TrainProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
