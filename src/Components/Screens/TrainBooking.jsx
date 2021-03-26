import React, { useState,useEffect } from 'react';
import {Alert,Form,Card,Button} from "react-bootstrap";
import {useTrain} from "../../Contexts/TrainContext";
import WeekDayContainer from "./WeekDayContainer";

export default function TrainBooking() {
    const {state} = useTrain();
    const [trains,setTrains] = useState([]);

    useEffect(()=>{
        setTrains(state.trains);
    },[]);

    return (
        <div>
            {
                trains.map(train=>(
                    <Card key={train._id} className="ml-5 mt-3" style={{ width: '50rem' }}>
                        <Card.Header className="d-flex"><h4>{train.TrainCode} {train.TrainName}</h4> <div className="mr-auto"/> 
                            <strong className="mr-2">Runs On: </strong>
                            <WeekDayContainer weekdays={train.TrainWeekDaySchedule}/>
                        </Card.Header>
                        <Card.Title></Card.Title>
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>        
                ))
            }
        </div>
    )
}
