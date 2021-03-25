import React,{useState,useEffect} from 'react'
import {useAuth} from "../../Contexts/AuthContext"
import { Container } from 'react-bootstrap'
import NavBar from './NavBar'

export default function DashBoard() {
    const {currentUser} = useAuth();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        setTimeout(()=>{
            setLoading(false);
        },1000);
    },[]);

    return (
        <React.Fragment>
            
            <div style={{overflowY:"hidden"}}>
            {    
            loading ?
            <div style={{marginLeft:"750px",marginTop:"300px"}} class="spinner-border text-primary" role="status"/>
            :
                <React.Fragment>
                    <NavBar/>
                    <Container>
                        <h1>Dashboard</h1>
                    </Container>
                </React.Fragment>
            }
            </div>
        </React.Fragment>
    )
}