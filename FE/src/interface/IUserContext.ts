import { createContext } from "react";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
}

export interface UserContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
});