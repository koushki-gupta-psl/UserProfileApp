import React from "react";

export interface UserDetails {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: object},
    phone: string
    website: string,
    company: {
          name: string,
            catchPhrase: string,
            bs: string
          
    }
}

export type UserContextType = {
    users: UserDetails[] ;
    setUser: (user: UserDetails[]) => void;
}