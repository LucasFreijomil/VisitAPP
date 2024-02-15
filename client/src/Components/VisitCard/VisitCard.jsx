export const VisitCard = ({props}) => 
{
    return(
        <div className=' flex-row p-2 h-36 bg-slate-300 rounded-lg'>
            <h3>{props.name}, {props.surname}</h3>
            <h4>{props.dni}</h4>
            {props.company && (<p>{props.company}</p>)}
            {props.work && (<p>{props.work}</p>)}
            {props.company && props.work && <p>Empleado</p>}
            {props.company && !props.work && <p>Proveedor</p>}
            {!props.company && !props.work && <p>Visita Estandar</p>}
        </div>
    )
}