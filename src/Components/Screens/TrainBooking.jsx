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
    const [activeItem,setActiveItem] = useState([]);
    const [activeTrainId,setActiveTrainId] = useState();
    const [scheduleActiveItem,setScheduleActiveItem] = useState([]);

    useEffect(()=>{
        setTrains(state.trains);
    },[]);

    const handleModalShow = (scheduleitem) => {
        setShow(true);
        setScheduleActiveItem(scheduleitem);
    }
    const handleModalClose = () => setShow(false);

    const handleBookModalShow = (trainseats,trainid) => {
        setBookShow(true);
        setActiveItem(trainseats);
        setActiveTrainId(trainid);
    };
    const handleBookModalClose = () =>{ 
        setBookShow(false);
    };

    return (
        <div>
            {
                trains.map(train=>(
                    <Card key={train._id} className="ml-5 mt-3" style={{ width: '50rem' }}>
                        <Card.Header className="d-flex"><h4>{train.TrainCode} {train.TrainName}</h4> <div className="mr-auto"/> 
                            <strong className="mr-2">Runs On: </strong>
                            <WeekDayContainer weekdays={train.TrainWeekDaySchedule}/>
                        </Card.Header>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>
                                <div className="d-flex mt-2">
                                    <strong className="ml-2">From: </strong><p>{train.TrainStations[0].StationCode} | {new Date(train.TrainStations[0].ArrivalTime).toTimeString().substr(0,5)}       |   {new Date(state.date).toLocaleDateString()}</p>
                                    <div className="mr-auto"/>
                                    <strong>To: </strong><p className="mr-2">{train.TrainStations[train.TrainStations.length-1].StationCode} | { new Date(train.TrainStations[train.TrainStations.length-1].ArrivalTime).toTimeString().substr(0,5)}</p>
                                </div>
                            </ListGroupItem>
                        </ListGroup>
                        <Card.Body>
                            <div className="d-flex">
                                <Button onClick={()=>handleBookModalShow(train.Seats,train._id)} disabled = {train.Seats.filter( seat => !seat.IsBooked).length <= 0}
                                >Book Now</Button>
                                <div className="mr-auto"/>
                                <Button onClick={()=>handleModalShow(train.TrainStations)}>View Schedule</Button>
                            </div>
                        </Card.Body>
                    </Card>    
                ))   
            }     
            <Modal show={bookShow} onHide={handleBookModalClose} size="lg">
                        <Modal.Header closeButton>
                        <Modal.Title>Book your Seats</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SeatsTable seats={activeItem} trainId={activeTrainId}/>
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
                            <ScheduleTable schedules={scheduleActiveItem}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleModalClose}>
                                Close
                            </Button>
                        </Modal.Footer>
            </Modal> 
        </div>
    )
}
