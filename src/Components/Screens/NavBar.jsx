import React,{useEffect} from 'react'
import {Navbar as BootStrapNavBar,Nav} from "react-bootstrap"
import { Link,useHistory } from 'react-router-dom'
import {useAuth} from "../../Contexts/AuthContext"
import BookingHistory from './BookingHistory';


export default function NavBar() {
    const history = useHistory();

    const {currentUser,logout} = useAuth();

    const handleLogout = ()=>{
        try{
            logout();
            history.push("/login");
        }
        catch(ex){
            
        }
    }

    return (
        <BootStrapNavBar bg="primary" variant="dark" expand="sm" sticky="top">
            <BootStrapNavBar.Brand as={Link} to="/">
                <div className="text-light">
                Train Reservation System
                </div> 
            </BootStrapNavBar.Brand>     
            <BootStrapNavBar.Toggle aria-controls="responsive-navbar-nav" />    
            <BootStrapNavBar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav>
                    <Nav.Link className="active" as={Link} to="/search">
                        Train Search
                    </Nav.Link>
                    <Nav.Link className="active" as={Link} to="/bookinghistory">
                        Booking History
                    </Nav.Link>
                    <Nav.Link className="active" as={Link} to="/livestatus">
                        Live Train Status
                    </Nav.Link>
                    {
                        currentUser.isAdmin ?
                        <Nav.Link className="active" as={Link} to="/traintraffic">
                            Train Traffic
                        </Nav.Link> 
                        : null
                    }
                    <Nav.Link as={Link} to="#">
                        <div className="text-light">
                            Username: {currentUser && currentUser.userName}
                        </div>
                    </Nav.Link>
                    {
                        currentUser.isAdmin ? 
                        <Nav.Link className="active" as={Link} to="#">
                            Access: Admin 
                        </Nav.Link> 
                        :
                        null
                    }
                    <Nav.Link as={Link} to="#" onClick={handleLogout}>
                        <div className="text-light">
                            LogOut
                        </div>
                    </Nav.Link>
                </Nav>
            </BootStrapNavBar.Collapse>  
        </BootStrapNavBar>
    )
}