import { useState } from "react";
import { DMain } from "./DMain/DMain.jsx";
import { DPending } from "./DPending/DPending.jsx";
import { DPendingDetail } from "./DPendingDetail/DPendingDetail.jsx";
import { DUserDetail } from './DUserDetail/DUserDetail.jsx';
import { DUsers } from "./DUsers/DUsers.jsx";
import { DsideBar } from "./DsideBar/DsideBar.jsx";

export const Dashboard = () =>
{
    const [ option, setOption ] = useState('main');
    const [ uDetail, setUDetail ] = useState(false);

    return(
        <div>

            <DsideBar setOption={setOption}/>

            <div>
                { option=='main' && <DMain />}
                { option=='pending' && <DPending setUDetail={setUDetail} setOption={setOption} />}
                { option=='pendingUserDetail' && <DPendingDetail uDetail={uDetail} setOption={setOption} />}
                { option=='users' && <DUsers setUDetail={setUDetail} setOption={setOption}/>}
                { option=='userDetail' && <DUserDetail uDetail={uDetail} setOption={setOption}/>}
            </div>

        </div>
    )
}