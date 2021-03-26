import React,{useEffect,useState} from 'react'
import { Container } from 'react-bootstrap';
import { useTrain } from '../../Contexts/TrainContext';
import BookingHistoryTable from './BookingHistoryTable';
import NavBar from './NavBar'

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
                bookingHistory.map(
                    history=>history.Seats.map(
                                seat=>
                                    <BookingHistoryTable histories={history} seats={seat}/>
                                )
                )
            }
        </>
    )
}