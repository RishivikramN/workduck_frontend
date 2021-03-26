import React, { useContext, useState } from 'react';
import axios from "axios";
import { trainRoutesEndpoint, getTrainEndpoint } from "../Config/Endpoints";

const TrainContext = React.createContext();

export function useTrain(){
    return useContext(TrainContext);
}

export function TrainProvider({children}){
    let state = {
        to:"",
        from:"",
        date:"",
        trains: [],
        seats:[]
    }

    const getTrainRoutes = async () => {
        const response = await axios.get(trainRoutesEndpoint);
        return response.data;
    }

    const bookSeats = (seats) => {
        state.seats = seats;
        console.log(state.seats);
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
        state
    }
    return(
        <TrainContext.Provider value={value}>
            {children}
        </TrainContext.Provider>
    )

}