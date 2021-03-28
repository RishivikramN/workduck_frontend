import React,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap';
import { useTrain } from '../../Contexts/TrainContext';
import BookingHistoryTable from './BookingHistoryTable';
import NavBar from './NavBar'

// Booking History component shows the logs 
// of seats booked by the users.
export default function BookingHistory() {
    const [bookingHistory,setBookingHistory] = useState([]);
    const {state,getBookingHistory} = useTrain();
    const [isLoading,setIsLoading] = useState(false);

    useEffect(async ()=>{
        setIsLoading(true);
        await getBookingHistory();
        setBookingHistory(state.bookinghistory);
        setIsLoading(false);
    },[]);

    return (
        <>
            <NavBar/>
            <Container>
                <h2 className="mt-2">Booking History</h2>
            </Container>
            {   isLoading ?
                <div style={{marginLeft:"750px",marginTop:"300px"}} class="spinner-border text-primary" role="status"/>
                :
                bookingHistory.length > 0 ?
                bookingHistory.map(
                    history=>history.Seats.map(
                                seat=>
                                    <BookingHistoryTable histories={history} seats={seat}/>
                                )
                )
                : 
                    <h6 className="mt-5 text-center">Nothing to show here</h6>
                  
            }
        </>
    )
}
