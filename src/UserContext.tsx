import React, { createContext, ReactNode, useState } from "react";

export interface UserContextType {
    userData: {
        username: string;
        id: String;
    }

    setUserData: React.Dispatch<React.SetStateAction<{
        username: string;
        id: string;
        }>
    >;
}

interface UserContextProviderProps {
    children: ReactNode;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
    const [userData, setUserData] = useState({
        username: '',
        id: ''
    });

    const contextValue: UserContextType = {
        userData,
        setUserData,
    };

    return (
        <UserContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserContext.Provider>

    );
}