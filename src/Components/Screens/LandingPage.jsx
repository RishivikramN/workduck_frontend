import React,{useRef,useState,useEffect} from 'react'
import {Alert,Form,Card,Button} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom';
import {useTrain} from "../../Contexts/TrainContext"
import CenteredContainer from "../Authentication/CenteredContainer";

export default function LandingPage() {
    const fromRef = useRef();
    const toRef = useRef();
    const dateRef = useRef();
    const { getTrainRoutes, getTrains, state, getBookingHistory } = useTrain();
    const [stations,setStations] = useState([]);
    const [loading,setLoading] = useState(false);
    const history = useHistory();
    useEffect(async () => {
        try {
            //fetch stations from the backend 
            setStations(await getTrainRoutes());   
        } catch (error) {
            console.log(error);
        }
    },[]);

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        await getTrains(fromRef.current.value,toRef.current.value,dateRef.current.value);
        console.log(state.bookinghistory);
        setLoading(false);
        history.push('/');
    };

    return (
        <div>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Train Search</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="from">
                                <Form.Label>From</Form.Label>
                                <Form.Control as="select" custom ref={fromRef} required>
                                    <option value="" disabled selected>From Station</option>    
                                    {
                                        stations.map(
                                            station=>(<option key={station._id} value={station.StationCode}>{station.StationCode}</option>)
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="to">
                                <Form.Label>To</Form.Label>
                                <Form.Control as="select" custom ref={toRef} required>
                                    <option value="" disabled selected>To Station</option>    
                                    {
                                        stations.map(
                                            station=>(<option key={station._id} value={station.StationCode}>{station.StationCode}</option>)
                                        )
                                    }
                                </Form.Control>
                            </Form.Group>
                            <Form.Group id="date">
                                <Form.Label>Journey Date</Form.Label>
                                <Form.Control type="date" ref={dateRef} required>
                                </Form.Control>
                            </Form.Group>
                            
                            <Button type="submit" className="w-100 text-center mt-2" disabled={loading}>{loading ? 
                                <div class="spinner-border text-light" role="status">
                            </div>
                            : "Search"}</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </CenteredContainer>
        </div>
    )
}
