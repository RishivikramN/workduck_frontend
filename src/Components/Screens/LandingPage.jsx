import React,{useRef,useState,useEffect} from 'react'
import {Alert,Form,Card,Button} from "react-bootstrap"
import { Link, useHistory } from 'react-router-dom';
import {useTrain} from "../../Contexts/TrainContext"
import CenteredContainer from "../Authentication/CenteredContainer";
import NavBar from './NavBar';

export default function LandingPage() {
    const fromRef = useRef();
    const toRef = useRef();
    const dateRef = useRef();
    const { getTrainRoutes, getTrains, state, getBookingHistory } = useTrain();
    const [stations,setStations] = useState([]);
    const [loading,setLoading] = useState(false);
    const [validation,setValidation] = useState({
        message : "",
        isDisabled: false
    });
    const history = useHistory();

    useEffect(async () => {
        try {
            //fetch stations from the backend 
            setStations(await getTrainRoutes());   
        } catch (error) {
            console.log(error);
        }
    },[]);

    const handleOnchange = () => {
        if(fromRef.current.value == toRef.current.value)
            setValidation({
                message: "From and To Stations cannot be same",
                isDisabled: true
            })
        else
            setValidation({
                message: "",
                isDisabled: false
            })
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        await getTrains(fromRef.current.value,toRef.current.value,dateRef.current.value);
        setLoading(false);
        history.push('/');
    };

    return (
        <div>
            <NavBar/>
            <CenteredContainer>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Train Search</h2>
                        {validation.isDisabled && <Alert variant="danger">{validation.message}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="from">
                                <Form.Label>From</Form.Label>
                                <Form.Control as="select" custom ref={fromRef} onChange={handleOnchange} required>
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
                                <Form.Control as="select" custom ref={toRef} onChange={handleOnchange} required>
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
                            
                            <Button type="submit" className="w-100 text-center mt-2" disabled={loading || validation.isDisabled}>{loading ? 
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
