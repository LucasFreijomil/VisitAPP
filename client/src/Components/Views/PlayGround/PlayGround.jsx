import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { decodeUser, delinkMessage, setRead } from '../../../Redux/actions/actions';
import './PlayGround.css';
import Styles from './PlayGround.module.css';

export const PlayGround = () =>
{
    const activeUser = useSelector( state => state.activeUser );
    const dispatch = useDispatch();
    const [ tomorrow, setTomorrow ] = useState( [] );
    const [ showAll, setShowAll ] = useState(true);
    const [ messages, setMessages ] = useState([]);
    const esLocale =
    {
        months: 'Enero_Febrero_Marzo_Abril_Mayo_Junio_Julio_Agosto_Septiembre_Octubre_Noviembre_Diciembre'.split('_'),
        monthsShort: 'ene._feb._mar._abr._may._jun._jul._ago._sep._oct._nov._dic.'.split('_'),
    };
    moment.updateLocale('es', esLocale);
    const settings =
    {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    
    useEffect( () =>
    {
        let nextDayEvents = [];
        activeUser && activeUser.Events.map( x =>
            {
                (moment(x.date).isSame( moment(new Date()).clone().add(1, 'day'), 'day') && x.alarm) && nextDayEvents.push( x );
            })
        setTomorrow(nextDayEvents);
        setMessages(activeUser?.Messages.filter( msg => !msg.read ));
    }, [activeUser])

    useEffect( () =>
    {
        setMessages(activeUser?.Messages?.filter( msg => !msg.read ));
    }, [activeUser])
    
    const convertirAfecha = ( fecha ) =>
    {
        let fechaLinda = moment(fecha).format('DD [de] MMMM [de] YYYY');
        return fechaLinda;
    }

    const marcarLeido = async (id) =>
    {
        setRead(id);
        decodeUser( JSON.parse( window.localStorage.getItem('activeUser') ) )
			.then( ( data ) =>
			{
				dispatch(data);
			})
			.catch( ( error ) =>
			{
				console.log("Error al logear usuario, promesa app.jsx: ", error);
			})
    }

    const desvincularMsj = async (msgId, userId) =>
    {
        delinkMessage( msgId, userId );
        decodeUser( JSON.parse( window.localStorage.getItem('activeUser') ) )
			.then( ( data ) =>
			{
				dispatch(data);
			})
			.catch( ( error ) =>
			{
				console.log("Error al logear usuario, promesa app.jsx: ", error);
			})
    }

    return(
        <div>
            <button onClick={()=>console.log("Mensajes: ", messages) } > mensajes </button>
                {messages?.length>0 && <div class='bg-orange-400'> Mensajes recientes: </div>}
            <div className={Styles.container}>
                
                {messages?.length==0 && <div> Sin mensajes que mostrar </div>}
                {messages?.length>0 && messages.map( (msg, index) =>{
                    let style = msg.urgent ? Styles.urgentCard : Styles.card;
                    let doThis = msg.general ? ()=>desvincularMsj(msg.id,activeUser.id) : ()=>marcarLeido(msg.id) ;
                    return(
                <div className={style} key={index} onClick={doThis}>
                    <h1> {msg.title} </h1>
                    <label> Urgent: {msg.urgent?'Yes':'No'} </label>
                    <h3> Body: {msg.body} </h3>
                    <h3> Visto: {msg.read?'Si':'No'} </h3>
                    <h3> General: {msg.general?'Si':'No'} </h3>
                    <button onClick={()=>console.log( msg )}> SHOW ME</button>
                </div>
                )}) }

                {messages?.length==0 &&
                <div className={Styles.card} >
                    <h3> No messages to show </h3>
                </div> }
                
            </div>

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