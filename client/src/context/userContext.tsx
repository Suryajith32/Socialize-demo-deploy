import { createContext, useState } from "react";
interface contextUser {
    children: any
}

export const UserContext = createContext<{
    user: any
    setUser: any
}>
    ({
        user: null, setUser: null
    })

export const User = ({ children }: contextUser): JSX.Element => {
    const [user, setUser] = useState<any>(null)

    return (
        <div>
            <UserContext.Provider value={{ user, setUser }}>
                {children}
            </UserContext.Provider>
        </div>
    )

}