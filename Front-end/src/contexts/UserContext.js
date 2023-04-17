import React, { createContext, useState } from "react";
import useToken from "../hooks/useToken";

export const UserInfoContext = createContext ({})

function UserInfoProvider ({children}) {
    const token = useToken();
    const [topicStatus, setTopicStatus] = useState();

    const config = {
        headers: {
            Authorization: `Bearer ${token} `
        }
    }

    return (
        <UserInfoContext.Provider value={{ config, topicStatus, setTopicStatus }}>
            {children}
        </UserInfoContext.Provider>
    )
}

export default UserInfoProvider