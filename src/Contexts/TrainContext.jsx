import React, { useContext, useState } from 'react';
import axios from "axios";
import { trainRoutesEndpoint, getTrainEndpoint, bookSeatTrainEndpoint, bookingHistoryTrainEndpoint } from "../Config/Endpoints";
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
        bookinghistory: []
    }

    const getTrainRoutes = async () => {
        const response = await axios.get(trainRoutesEndpoint);
        return response.data;
    }

    const bookSeats = async (seats,trainId,user) => {
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
    }

    const getBookingHistory = async () => {
        console.log(currentUser);
        const response = await axios.get(`${bookingHistoryTrainEndpoint}/${currentUser.userId}`,{headers:{
            'x-auth-token' : token
        }});
        state.bookinghistory = response.data;
    }

    const getTrains = async (from,to,date)=>{
        state.to = to;
        state.from = from;
        state.date = date;
        const computedEndpoint = `${getTrainEndpoint}/${from}-${to}-${date}`;
        const response = await axios.get(computedEndpoint);
        state.trains = response.data;
    };

    const value={
        getTrainRoutes,
        getTrains,
        bookSeats,
        getBookingHistory,
        state
    }
    return(
        <TrainContext.Provider value={value}>
            {children}
        </TrainContext.Provider>
    )

}