import React, { useContext, useState } from 'react';
import axios from "axios";
import { trainRoutesEndpoint, getTrainEndpoint
         , bookSeatTrainEndpoint, bookingHistoryTrainEndpoint
         , liveStatusTrainEndpoint, trainTrafficTrainEndpoint }
         from "../Config/Endpoints";
import { useAuth } from './AuthContext';

const TrainContext = React.createContext();

export function useTrain(){
    return useContext(TrainContext);
}

export function TrainProvider({children}){
    const {token,currentUser} = useAuth();
    let state = {
        to:"",
        from:"",
        date:"",
        trains: [],
        seats:[],
        bookinghistory: [],
        trainroutes: [],
        livestatus: {},
        traintraffic: []
    }

    const getTrainRoutes = async () => {
        try {
            const response = await axios.get(trainRoutesEndpoint,{headers:{
                'x-auth-token' : token
            }});
            state.trainroutes = response.data;
            return response.data;   
        } catch (error) {
            console.log(error);
        }
    }

    const bookSeats = async (seats,trainId,user) => {
        try {    
            const payload = {
                BookedSeatIds: seats,
                TrainId: trainId,
                UserId: user.userId,
                BookingDate: state.date
            };
            state.seats = seats;
            const response = await axios.post(bookSeatTrainEndpoint, payload,{headers:{
                'x-auth-token' : token
            }});   
        } catch (error) {
            console.log(error);
        }
    }

    const getBookingHistory = async () => {
        try {
            const response = await axios.get(`${bookingHistoryTrainEndpoint}/${currentUser.userId}`,{headers:{
                'x-auth-token' : token
            }});
            state.bookinghistory = response.data;   
        } catch (error) {
            console.log(error);
        }
    }

    const getTrains = async (from,to,date)=>{
        try {
            state.to = to;
            state.from = from;
            state.date = date;
            const computedEndpoint = `${getTrainEndpoint}/${from}-${to}-${date}`;
            const response = await axios.get(computedEndpoint,{headers:{
                'x-auth-token' : token
            }});
            state.trains = response.data;   
        } catch (error) {
            console.log(error);
        }
    };

    const getLiveTrainStatus = async (trainId) => {
        try {
            const response = await axios.get(`${liveStatusTrainEndpoint}/${trainId}`,{headers:{
                'x-auth-token' : token
            }});
            state.livestatus = response.data;
            console.log(state.livestatus);
        } catch (error) {
            console.log(error);
        }
    }

    const getTrainTraffic = async (stationId, fromTime, toTime) => {
        try {
            const computedEndpoint = `${trainTrafficTrainEndpoint}/${stationId}-${fromTime}-${toTime}`;
            const response = await axios.get(computedEndpoint,{headers:{
                'x-auth-token' : token
            }});
            state.traintraffic = response.data;
            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const value={
        getTrainRoutes,
        getTrains,
        bookSeats,
        getBookingHistory,
        getLiveTrainStatus,
        getTrainTraffic,
        state
    }
    return(
        <TrainContext.Provider value={value}>
            {children}
        </TrainContext.Provider>
    )

}