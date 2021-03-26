import React,{useEffect, useRef} from 'react';
import {Table,FormCheck} from "react-bootstrap";
import { useTrain } from '../../Contexts/TrainContext';

export default function SeatsTable({seats}) {
    let bookedseats = [];
    const checkref = useRef();
    const {bookSeats} = useTrain();

    useEffect(()=>{
        return ()=>{
            bookedseats.forEach((bookedseat)=>{
                seats.forEach((seat)=>{
                    if(seat._id == bookedseat._id)
                        seat.IsBooked = true;
                });
            });
            bookSeats(bookedseats);
        }
    },[]);
    
    const handleOnChange = async (seat)=>{
        
        if(checkref.current.value)     
        {     
            bookedseats.push(seat);

            if(bookedseats.filter(x=>x._id == seat._id).length > 1){
                bookedseats = bookedseats.filter(x=>{return x._id != seat._id});
            }
        }
    };

    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th></th>
                    <th>Seat Number</th>
                    <th>Seat Type</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        seats.map( seat => (
                            <tr key={seat._id}>
                                <td>{seat.IsBooked ? <p>Booked</p>: <FormCheck ref={checkref} onChange={()=>handleOnChange(seat)}/>}</td>
                                <td>{seat.SeatNumber}</td>
                                <td>{seat.SeatType}</td>
                                <td>{seat.Price}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>   
        </>
    )
}
