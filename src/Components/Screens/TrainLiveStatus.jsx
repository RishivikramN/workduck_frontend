import React,{useEffect, useState} from 'react'
import NavBar from './NavBar'
import {Form,Button,Col,Card} from "react-bootstrap"
import { useTrain } from '../../Contexts/TrainContext';
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from '../Authentication/CenteredContainer';

export default function TrainLiveStatus() {
    const [trains,setTrains] = useState([]);
    const [loading,setLoading] = useState(false);
    const {state,getLiveTrainStatus} = useTrain();
    const history = useHistory();

    let trainId;

    useEffect(
        ()=>{
            setTrains(state.trains);
    },[]);

    const handleSelectChange = (event) => {
        const selectedIndex = event.target.options.selectedIndex;
        trainId = event.target.options[selectedIndex].getAttribute('data-key');
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setLoading(true);
        await getLiveTrainStatus(trainId);
        setLoading(false);
        history.push('/livestatusdisplay');
    }

    return (
        <div>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Live status</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="status">
                                <Form.Label>Select a train</Form.Label>
                                <Form.Control as="select" onChange={handleSelectChange} custom required>
                                    <option value="" disabled selected>Select Train</option>    
                                    {
                                        trains.map(
                                            train=>(<option key={train._id} data-key={train._id} value={train.TrainName}>{train.TrainName}</option>)
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Button type="submit" className="w-100 text-center mt-2" disabled={loading}>{loading ? 
                                <div class="spinner-border text-light" role="status">
                            </div>
                            : "Get Status"}</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </CenteredContainer>
        </div>
    )
}
