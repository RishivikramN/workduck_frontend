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
        trains: []
    }

    const getTrainRoutes = async () => {
        const response = await axios.get(trainRoutesEndpoint);
        return response.data;
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
        state
    }
    return(
        <TrainContext.Provider value={value}>
            {children}
        </TrainContext.Provider>
    )

}