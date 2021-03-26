import React,{useState,useEffect} from 'react'
import {useAuth} from "../../Contexts/AuthContext"
import { Container } from 'react-bootstrap'
import NavBar from './NavBar'
import TrainBooking from './TrainBooking';
import BookingHistory from './BookingHistory';

export default function DashBoard() {
    const {currentUser} = useAuth();

    return (
        <React.Fragment>
            <React.Fragment>
                <NavBar/>
                <Container>
                    <TrainBooking/>
                </Container>
            </React.Fragment>
        </React.Fragment>
    )
}