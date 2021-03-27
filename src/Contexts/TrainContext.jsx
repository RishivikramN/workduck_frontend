import React, { useContext, useState } from 'react';
import axios from "axios";
import { trainRoutesEndpoint, getTrainEndpoint, bookSeatTrainEndpoint, bookingHistoryTrainEndpoint, liveStatusTrainEndpoint } from "../Config/Endpoints";
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
        livestatus: {}
    }

    const getTrainRoutes = async () => {
        try {
            const response = await axios.get(trainRoutesEndpoint);
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
            const response = await axios.get(computedEndpoint);
            state.trains = response.data;   
        } catch (error) {
            console.log(error);
        }
    };

    const getLiveTrainStatus = async (trainId) => {
        try {
            const response = await axios.get(`${liveStatusTrainEndpoint}/${trainId}`);
            state.livestatus = response.data;
            console.log(state.livestatus);
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
        state
    }
    return(
        <TrainContext.Provider value={value}>
            {children}
        </TrainContext.Provider>
    )

}