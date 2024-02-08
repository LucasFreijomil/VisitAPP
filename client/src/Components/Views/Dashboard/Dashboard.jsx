import { useState } from "react";
import { DMain } from "./DMain/DMain.jsx";
import { DPending } from "./DPending/DPending.jsx";
import { DUsers } from "./DUsers/DUsers.jsx";
import { DsideBar } from "./DsideBar/DsideBar.jsx";

export const Dashboard = () =>
{
    const [ option, setOption ] = useState('main');

    return(
        <div>

            <DsideBar setOption={setOption}/>

            <div>
                { option=='main' && <DMain />}
                { option=='pending' && <DPending />}
                { option=='users' && <DUsers />}
            </div>

        </div>
    )
}