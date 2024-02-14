export const VisitCard = ({props}) => 
{
    return(
        <div className='flex w-10 h-10 bg-sky-700 gap-2'>
            <p>{props.name}, {props.surname}</p>
            <p>{props.dni}</p>
            {props.company && (<p>{props.company}</p>)}
            {props.work && (<p>{props.work}</p>)}
            {props.company && props.work && <p>Empleado</p>}
            {props.company && !props.work && <p>Proveedor</p>}
            {!props.company && !props.work && <p>Visita Estandar</p>}
        </div>
    )
}