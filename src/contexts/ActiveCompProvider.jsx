import { createContext, useContext, useState } from 'react';

const ActiveCompContext = createContext();

export const ActiveCompProvider = ({ children }) => {
    const [activeComponent, setActiveComponent] = useState(null);

    return (
        <ActiveCompContext.Provider value={{ activeComponent, setActiveComponent }}>
            {children}
        </ActiveCompContext.Provider>
    );
};

export const useActiveComp = () => {
    return useContext(ActiveCompContext);
};