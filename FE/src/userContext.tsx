import { createContext, useEffect, useState } from "react";
import { UserContextType, User } from "./interface/IUserContext";
import axios from "axios";

export const UserContext = createContext({} as UserContextType)


export function UserContextProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    useEffect(() => {
        if(!user) {
            axios.get('/profile').then(({data}) => {
                setUser(data)
            })
        }
    })
return (
    <UserContext.Provider value={{ user, setUser }}>
        {children}
    </UserContext.Provider>
)
}