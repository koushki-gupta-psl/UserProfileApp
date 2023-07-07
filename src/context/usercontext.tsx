import React, { useState } from "react";
import { UserContextType, UserDetails } from "./type";



export const UserContext = React.createContext<UserContextType | null>(null);

function UsersProvider(props: { children: React.ReactNode }) {
    const [users, setUsers] = useState<UserDetails[]>([]);
    const setUser = (user: UserDetails[]) => {
        setUsers(user)
    }
    return (
        <UserContext.Provider value={{ users, setUser }}>{props.children}</UserContext.Provider>
    )
}

export default UsersProvider;