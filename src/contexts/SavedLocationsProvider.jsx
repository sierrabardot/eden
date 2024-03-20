import { createContext, useContext, useState, useEffect } from 'react';
import * as locationsService from '../utilities/locations-service';
import { useLoading } from './LoadingProvider';

const SavedLocationsContext = createContext({});

export const SavedLocationsProvider = ({ children }) => {
    const [savedLocations, setSavedLocations] = useState([]);
    const { setLoading } = useLoading()

    useEffect(() => {
        const fetchSavedLocations = async () => {
            setLoading(true)
            const locations = await locationsService.getSavedLocations();
            setSavedLocations(locations);
            setLoading(false)
        };
        fetchSavedLocations();
    }, []);

    return (
        <SavedLocationsContext.Provider value={{ savedLocations, setSavedLocations }}>
            {children}
        </SavedLocationsContext.Provider>
    );
};

export const useSavedLocations = () => {
    return useContext(SavedLocationsContext);
};