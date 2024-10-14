import { createContext, useEffect, useState } from "react";
import { UserContextType, User } from "./interface/IUserContext";
import axios from "axios";

export const UserContext = createContext({} as UserContextType)


export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [ready, setReady] = useState<boolean>(false);
    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data)
                setReady(true)
            })
        }
    })
    return (
        <UserContext.Provider value={{ user, setUser, ready }}>
            {children}
        </UserContext.Provider>
    )
}