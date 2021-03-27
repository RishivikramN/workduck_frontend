import { AuthProvider } from "./Contexts/AuthContext";
import { TrainProvider } from "./Contexts/TrainContext";
import SignUp from "./Components/Authentication/SignUp";
import Login from "./Components/Authentication/Login";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import PrivateRouteHOC from "./Components/Authentication/PrivateRouteHOC";
import DashBoard from "./Components/Screens/Dashboard";
import LandingPage from "./Components/Screens/LandingPage";
import BookingHistory from "./Components/Screens/BookingHistory";
import TrainLiveStatus from "./Components/Screens/TrainLiveStatus";
import TrainLiveStatusDisplay from "./Components/Screens/TrainLiveStatusDisplay";
import TrainTraffic from "./Components/Screens/TrainTraffic";
import TrainTrafficDisplay from "./Components/Screens/TrainTrafficDisplay";

function App() {
  return (
    <Router>
      <AuthProvider>
        <TrainProvider>
            <Switch>
              <PrivateRouteHOC exact path="/" component={DashBoard}/>
              <PrivateRouteHOC path='/search' component={LandingPage}/>
              <PrivateRouteHOC path='/bookinghistory' component={BookingHistory}/>
              <PrivateRouteHOC path='/livestatus' component={TrainLiveStatus}/>
              <PrivateRouteHOC path='/livestatusdisplay' component={TrainLiveStatusDisplay}/>
              <PrivateRouteHOC path='/traintraffic' component={TrainTraffic}/>
              <PrivateRouteHOC path='/traintrafficdisplay' component={TrainTrafficDisplay}/>
              {/* Auth Routes */}
              <Route path="/signup" component={SignUp}/>
              <Route path="/login" component={Login}/>
            </Switch>
          </TrainProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
