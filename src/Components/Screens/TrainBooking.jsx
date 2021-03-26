import React, { useState,useEffect } from 'react';
import {Modal,Card,Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {useTrain} from "../../Contexts/TrainContext";
import ScheduleTable from './ScheduleTable';
import SeatsTable from './SeatsTable';
import WeekDayContainer from "./WeekDayContainer";

export default function TrainBooking() {
    const {state} = useTrain();
    const [trains,setTrains] = useState([]);
    const [show,setShow] = useState(false);
    const [bookShow,setBookShow] = useState(false);

    useEffect(()=>{
        setTrains(state.trains);
    },[]);

    const handleModalShow = () => setShow(true);
    const handleModalClose = () => setShow(false);

    const handleBookModalShow = () => setBookShow(true);
    const handleBookModalClose = () =>{ 
        setBookShow(false);
    };

    return (
        <div>
            {
                trains.map(train=>(
                    <>
                    <Card key={train._id} className="ml-5 mt-3" style={{ width: '50rem' }}>
                        <Card.Header className="d-flex"><h4>{train.TrainCode} {train.TrainName}</h4> <div className="mr-auto"/> 
                            <strong className="mr-2">Runs On: </strong>
                            <WeekDayContainer weekdays={train.TrainWeekDaySchedule}/>
                        </Card.Header>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <div className="d-flex mt-2">
                                    <strong className="ml-2">From: </strong><p>{state.from} | {new Date(train.TrainStations[0].ArrivalTime).toLocaleDateString()} | {new Date(train.TrainStations[0].ArrivalTime).toTimeString().substr(0,5)}</p>
                                    <div className="mr-auto"/>
                                    <strong>To: </strong><p className="mr-2">{state.to} | {new Date(train.TrainStations[train.TrainStations.length-1].ArrivalTime).toLocaleDateString()} | { new Date(train.TrainStations[train.TrainStations.length-1].ArrivalTime).toTimeString().substr(0,5)}</p>
                                </div>
                            </ListGroupItem>
                            <ListGroupItem>
                                <div className="d-flex mt-2">
                                    <strong className="ml-2">Tickets Available: </strong>
                                    <p className="ml-2">{train.Seats.filter( seat => !seat.IsBooked).length} 
                                    </p>
                                    <div className="mr-auto"/>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <div className="d-flex">
                                <Button onClick={handleBookModalShow} disabled = {train.Seats.filter( seat => !seat.IsBooked).length <= 0}
                                >Book Now</Button>
                                <div className="mr-auto"/>
                                <Button onClick={handleModalShow}>View Schedule</Button>
                            </div>
                        </Card.Body>
                    </Card>    
                    <Modal show={bookShow} onHide={handleBookModalClose} size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title>Book your Seats</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SeatsTable seats={train.Seats}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleBookModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>    
                    <Modal show={show} onHide={handleModalClose} size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title>Train Schedule</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <ScheduleTable schedules={train.TrainStations}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    </>
                ))
            }            
        </div>
    )
}
