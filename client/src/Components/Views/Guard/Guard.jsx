import { useSelector } from "react-redux";
import { Messages } from "../../Messages/Messages.jsx";
import { GMain } from "./GMain/GMain.jsx";

export const Guard = () =>
{
    const guardView = useSelector( state => state.guardView );

    return(
        <div>
            { guardView=='main' && <GMain />}
            { guardView=='messages' && <Messages />}
        </div>
    )
}

