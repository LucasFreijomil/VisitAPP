import moment from 'moment';
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import './PlayGround.css';

export const PlayGround = () =>
{
    const activeUser = useSelector( state => state.activeUser );
    const [ tomorrow, setTomorrow ] = useState( [] );
    const [ showAll, setShowAll ] = useState(true);
    const esLocale =
    {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
    };
    moment.updateLocale('es', esLocale);

    
    useEffect( () =>
    {
        let nextDayEvents = [];
        console.log("Ejecutado\n", activeUser);
        activeUser && activeUser.Events.map( x =>
            {
                (moment(x.date).isSame( moment(new Date()).clone().add(1, 'day'), 'day') && x.alarm) && nextDayEvents.push( x );
                console.log(x);
            })
        setTomorrow(nextDayEvents);
    }, [activeUser])
    
    const convertirAfecha = ( fecha ) =>
    {
        let fechaLinda = moment(fecha).format('DD [de] MMMM [de] YYYY');
        return fechaLinda;
    }

    return(
        <div>

            { tomorrow.length>0 && tomorrow.map( (x, y) =>
            <div key={y}>
                <button onClick={() => console.log(x )}> ESTE EVENTO </button>
                <br/>
                <label> Titulo: {x.title} </label>
                <br/>
                <label> Date: {convertirAfecha(x.date)} </label>
                <br/>
            </div>)}

            { (!showAll && tomorrow.length==0) && <div> Sin eventos para mañana </div>}

        </div>
    )
}