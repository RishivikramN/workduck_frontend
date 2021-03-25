import React,{useEffect} from 'react'
import {Navbar as BootStrapNavBar,Nav} from "react-bootstrap"
import { Link,useHistory } from 'react-router-dom'
import {useAuth} from "../../Contexts/AuthContext"


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
        <BootStrapNavBar bg="primary" variant="dark" expand="sm">
            <BootStrapNavBar.Brand as={Link} to="/">
                <div className="text-light">
                Train Reservation System
                </div> 
            </BootStrapNavBar.Brand>     
            <BootStrapNavBar.Toggle aria-controls="responsive-navbar-nav" />    
            <BootStrapNavBar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto"/>
                <Nav>
                    <Nav.Link as={Link} to="#">
                        <div className="text-light">
                            <strong>Hello! {currentUser && currentUser.userName} </strong>
                        </div>
                    </Nav.Link>
                    <Nav.Link as={Link} to="#" onClick={handleLogout}>
                        <div className="text-light">
                            <strong>LogOut</strong>
                        </div>
                    </Nav.Link>
                </Nav>
            </BootStrapNavBar.Collapse>  
        </BootStrapNavBar>
    )
}