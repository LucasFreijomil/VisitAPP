import { useState } from "react";
import { DsideBar } from "./DsideBar/DsideBar.jsx";

export const Dashboard = () =>
{
    const [ option, setOption ] = useState('main');

    return(
        <div>
            <DsideBar setOption={setOption}/>
            <div>
                { option=='main' && <div> Principal </div>}
                { option=='pending' && <div> Pendiente </div>}
                { option=='users' && <div> USUARIOS </div>}
            </div>
        </div>
    )
}