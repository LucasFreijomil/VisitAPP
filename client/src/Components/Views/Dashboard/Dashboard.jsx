import { useState } from "react";
import { CreateGuard } from '../../Create/CreateGuard/CreateGuard.jsx';
import { DGuardDetail } from "./DGuardDetail/DGuardDetail.jsx";
import { DGuards } from "./DGuards/DGuards.jsx";
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
    const [ gDetail, setGDetail ] = useState(false);

    return(
        <div>

            <DsideBar setOption={setOption}/>

            <div>
                { option=='main' && <DMain />}
                { option=='createGuard' && <CreateGuard />}

                { option=='guards' && <DGuards setGDetail={setGDetail} setOption={setOption}/>}
                { option=='guardDetail' && <DGuardDetail gDetail={gDetail} setOption={setOption} />}

                { option=='pending' && <DPending setUDetail={setUDetail} setOption={setOption} option={option} />}
                { option=='pendingUserDetail' && <DPendingDetail uDetail={uDetail} setOption={setOption} />}

                { option=='users' && <DUsers setUDetail={setUDetail} setOption={setOption}/>}
                { option=='userDetail' && <DUserDetail uDetail={uDetail} setOption={setOption}/>}
            </div>

        </div>
    )
}