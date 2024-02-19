import { useState } from "react";
import { useSelector } from 'react-redux';

export const CreateEvent = () =>
{
    const { activeUser } = useSelector( state => state );
    const [ user, setUser ] = useState(false);
    const [ form, setForm ] = useState(
        {
            title: '',
            date: '',
            startsAt: '',
            endsAt: '',
            body: '',
            alarm: false,
            visitId: false,
            userId: activeUser.id
        }
    )

    const handleChange = e =>
    {
		const {name, value} = e.target;
		setForm(prevInput => ({...prevInput, [name]: value}));
	}

    const handleSubmit = () => 
    {
        
    }

    return(
        <div>
            <form onSubmit={handleSubmit} className="relative bg-brown px-6 pt-10 pb-6 shadow-xl ring-gray-600/5 sm:max-w-lg sm:rounded-lg sm:px-10">

                <fieldset>

                    <div>
                        <p>title</p>
                        <input type="text" name="title" value={form.title} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p>startsAt</p>
                        <input type="text" name="startsAt" value={form.startsAt} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p>endsAt</p>
                        <input type="text" name="endsAt" value={form.endsAt} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p>body</p>
                        <input type="text" name="body" value={form.body} onChange={handleChange} />
                    </div>
                    <br />

                    <div>
                        <p>visitante</p>
                        <select name='visitId' onChange={handleChange}>
                            { activeUser.Visitas.length>0 && activeUser.Visitas?.map( (x, y) =>
                            <option value={x.id} key={y}> {x.name} </option>
                            )}
                        </select>
                        <br/>
                        {form.visitId &&
                        <label> {activeUser.Visitas.map( x => {if(x.id==form.visitId ) return x.name})}
                            <button type='button' onClick={() => setForm({...form, visitId: false})}> ( x )</button>
                        </label>}
                    </div>

                    <button type='button' onClick={()=>console.log(form)}> form so far </button>
                    <br />

                </fieldset>

            </form>
            Soy el CreateEvent
        </div>
    )
}