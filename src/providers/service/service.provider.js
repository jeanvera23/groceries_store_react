import React, { createContext, useEffect, useReducer } from 'react';

import serviceReducer, { INITIAL_STATE } from "./service.reducer";

export const ServiceContext = createContext();

const ServiceProvider = ({ children }) => {
    const [state, dispatch] = useReducer(serviceReducer, INITIAL_STATE, (INITIAL_STATE) => {
        const localData = sessionStorage.getItem("ServiceProvider");
        return localData ? JSON.parse(localData) : INITIAL_STATE
    });
    useEffect(() => {
        sessionStorage.setItem('ServiceProvider', JSON.stringify(state));
    }, [state])

    return (
        <ServiceContext.Provider value={{ state, dispatch }}>
            {children}
        </ServiceContext.Provider>
    )
}
export default ServiceProvider;