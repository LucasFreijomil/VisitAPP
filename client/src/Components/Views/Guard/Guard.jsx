import { useState } from "react";
import { DUserDetail } from '../Dashboard/DUserDetail/DUserDetail.jsx';
import { DUsers } from "../Dashboard/DUsers/DUsers.jsx";
import { GMain } from "./GMain/GMain.jsx";
import { GSideBar } from "./GSideBar/GSideBar.jsx";

export const Guard = () =>
{
    const [ option, setOption ] = useState('main');
    const [ uDetail, setUDetail ] = useState(false);

    return(
        <div>

            <GSideBar setOption={setOption}/>

            <div>

                { option=='main' && <GMain />}

                { option=='users' && <DUsers setUDetail={setUDetail} setOption={setOption}/>}
                { option=='userDetail' && <DUserDetail uDetail={uDetail} setOption={setOption}/>}

            </div>

        </div>
    )
}