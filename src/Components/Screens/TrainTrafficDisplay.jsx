import React from 'react'
import NavBar from './NavBar'
import { Card } from 'react-bootstrap';
import { useTrain } from '../../Contexts/TrainContext';

// TrainTrafficDisplay component displays the results from
// the TrainTraffic component.
export default function TrainTrafficDisplay() {
    const {state} = useTrain();

    return (
        <div>
            <NavBar/>
            <h3 className="ml-5 mt-5">Trains at your station</h3>
            {
                state.traintraffic.map(
                    train => (
                            <Card className="ml-5 mt-3" style={{ width: '50rem' }}>
                                <Card.Header className="d-flex">
                                    <h5>Code:</h5>
                                    <h6 className="ml-3 mt-1">{train.TrainCode}</h6>
                                    <div className="mr-auto"/> 
                                    <h5>Name:</h5>
                                    <h6 className="ml-3 mt-1" >{train.TrainName}</h6>
                                </Card.Header>     
                            </Card>    
                    )
                )
            }
            
        </div>
    )
}
