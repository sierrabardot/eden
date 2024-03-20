import { createContext, useContext, useState } from 'react';

const ActiveCompContext = createContext();

export const ActiveCompProvider = ({ children }) => {
    const [activeComponent, setActiveComponent] = useState(null);
    const [activeComponentData, setActiveComponentData] = useState(null);

    const setData = (componentName, data) => {
        setActiveComponent(componentName);
        setActiveComponentData(data);
    };

    return (
        <ActiveCompContext.Provider value={{ activeComponent, activeComponentData, setData }}>
            {children}
        </ActiveCompContext.Provider>
    );
};

export const useActiveComp = () => {
    return useContext(ActiveCompContext)
}