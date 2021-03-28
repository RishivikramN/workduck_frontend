import React from 'react'
import { Card, Container } from 'react-bootstrap';
import { useTrain } from '../../Contexts/TrainContext';
import NavBar from './NavBar'

export default function TrainLiveStatusDisplay() {
    const {state} = useTrain();

    return (
        <div>
            <NavBar/>
            <h3 className="ml-5 mt-5">Live Status of the searched trains</h3>
                {
                state.livestatus.Message.length > 0 ?
                    <h6 className="text-center mt-5">{state.livestatus.Message}</h6>
                    : 
                (    
                state.livestatus.standby.length == 0 ?
                    <Card className="ml-5 mt-3" style={{ width: '50rem' }}>
                        <Card.Header className="d-flex">
                            <h5>Moving From:</h5>
                            <h6 className="ml-3 mt-1">{state.livestatus.from}</h6>
                            <div className="mr-auto"/> 
                            <h5>To:</h5>
                            <h6 className="ml-3 mt-1" >{state.livestatus.to}</h6>
                        </Card.Header>     
                        <Card.Body>
                            <div className="d-flex mt-2">
                                    <strong>Status:</strong>
                                    {
                                        state.livestatus.delay ?
                                        <p className="ml-3" style={{color:"red"}}>Delayed</p>:
                                        <p className="ml-3" style={{color:"green"}}>On Time</p>
                                    }
                                </div>
                        </Card.Body>
                    </Card>    
                    :<Card className="ml-5 mt-3" style={{ width: '50rem' }}>
                        <Card.Header className="d-flex">
                            <h5>Standing by at: </h5>
                            <h6 className="ml-3 mt-1">{state.livestatus.standby}</h6>
                        </Card.Header>     
                    </Card>
                )}
        </div>
    )
}
