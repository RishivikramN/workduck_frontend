import React from 'react'
import {Container, Table} from "react-bootstrap";

//BookingHistoryTable component is a display UI Component
export default function BookingHistoryTable({histories,seats}) {
    return (
        <Container>
            <div className="mt-5">
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Train Code</th>
                        <th>Train Name</th>
                        <th>Booking Date</th>
                        <th>Seat Type</th>
                        <th>Seat Number</th>
                        </tr>
                    </thead>
                    <tbody>    
                        <tr key={seats._id}>
                            <td>{histories.TrainCode}</td>
                            <td>{histories.TrainName}</td>
                            <td>{new Date(histories.BookingDate).toLocaleDateString()}</td>
                            <td>{seats.SeatType}</td>
                            <td>{seats.SeatNumber}</td>
                        </tr>
                    </tbody>
                </Table>   
            </div>
        </Container>
    )
}
