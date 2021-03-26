import React from 'react';
import {Table} from "react-bootstrap";

export default function ScheduleTable({schedules}) {
    return (
        <>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                    <th>S.No</th>
                    <th>Station Name</th>
                    <th>Arrival Time</th>
                    <th>Departure Time</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        schedules.map( schedule => (
                            <tr key={schedule._id}>
                                <td>{schedule.SequenceNumber}</td>
                                <td>{schedule.StationName}</td>
                                <td>{new Date(schedule.ArrivalTime).toLocaleString()}</td>
                                <td>{new Date(schedule.DepartureTime).toLocaleString()}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table>   
        </>
    )
}
