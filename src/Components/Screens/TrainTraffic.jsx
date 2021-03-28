import React,{useEffect, useState, useRef} from 'react'
import {Form,Button,Col,Card} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom';
import CenteredContainer from '../Authentication/CenteredContainer';
import { useTrain } from '../../Contexts/TrainContext';
import {parseTime} from '../../Utils/DateUtils';
import NavBar from './NavBar';

export default function TrainTraffic() {
    const fromTimeRef = useRef();
    const toTimeRef = useRef();
    const {state, getTrainTraffic} = useTrain();
    const [stations,setStations] = useState([]);
    const [loading,setLoading] = useState(false);

    const history = useHistory();

    let stationId;

    useEffect(()=>{
        setStations(state.trainroutes);
    },[]);

    const handleSelectChange = (event) => {
        const selectedIndex = event.target.options.selectedIndex;
        stationId = event.target.options[selectedIndex].getAttribute('data-key');
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();
        setLoading(true);
        await getTrainTraffic(stationId,parseTime(fromTimeRef.current.value),parseTime(toTimeRef.current.value));
        setLoading(false);
        history.push('/traintrafficdisplay');
    }

    return (
        <div>
            <NavBar/>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Train Traffic</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="status">
                                <Form.Label>Select a Station</Form.Label>
                                <Form.Control as="select" onChange={handleSelectChange} custom required>
                                    <option value="" disabled selected>Select Station</option>    
                                    {
                                        stations.map(
                                            station=>(<option key={station._id} data-key={station._id} value={station.StationCode}>{station.StationCode}</option>)
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                    <Form.Label>From Time</Form.Label>
                                    <Form.Control type="time" ref={fromTimeRef} required/>
                            </Form.Group>
                            <Form.Group>
                                    <Form.Label>To Time</Form.Label>
                                    <Form.Control type="time" ref={toTimeRef} required/>
                            </Form.Group>
                            <Button type="submit" className="w-100 text-center mt-2" disabled={loading}>{loading ? 
                                <div class="spinner-border text-light" role="status">
                            </div>
                            : "Get Traffic"}</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </CenteredContainer>
        </div>
    )
}
