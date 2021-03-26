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
                    <Nav.Link as={Link} to="#">
                        Username: {currentUser && currentUser.userName}
                    </Nav.Link>
                    <Nav.Link as={Link} to="#" onClick={handleLogout}>
                        LogOut
                    </Nav.Link>
                </Nav>
            </BootStrapNavBar.Collapse>  
        </BootStrapNavBar>
    )
}