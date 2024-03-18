import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeGuard, decodeUser } from "../../Redux/actions/actions";

export const Messages = () =>
{
    const activeUser = useSelector( state => state.activeUser );
    const dispatch = useDispatch();
    let url = 'http://localhost:3001/users';
    const [ user, setUser ] = useState(false);
    const [ allUsers, setAllUsers ] = useState([]);
    const [ selectedUsers, setSelectedUsers ] = useState( [] );
    const [ form, setForm ] = useState(
        {
            title: '',
            body: '',
            urgent: false,
            general: false,
            userId: [],
            urgent: false,
            general: false,
        }
    )

    useEffect( () =>
    {
        axios.get(`${url}`)
        .then( ( { data} ) =>
        {
            setAllUsers(data);
        })
        .catch( ( error ) =>
        {
            console.log("Error fetching allUsers: ", error);
        })
    }, [])

    useEffect( () =>
    {
        setUser(activeUser);
    }, [activeUser])

    const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prevInput) => ({ ...prevInput, [name]: value }));
	};

    const handleSelectDestinatary = (e) =>
    {
        if (!selectedUsers.includes(e.target.value) && e.target.value !== 'default')
        {
            let thisOne = e.target.value.split(',')[0];
            setSelectedUsers( [...selectedUsers, e.target.value ] );
            setForm( { ...form, userId: [ ...form.userId, thisOne ] } );
        }
	};

    const handleCheckboxChange = (e) =>
	{
		setForm( { ...form, [e.target.name]: e.target.checked } );
	}

    const handleSubmit = async (event) => {
		event.preventDefault();

		try
		{
			const { data } = await axios.post('http://localhost:3001/messages', form);
			alert('Message sent!', data);
			setForm({
                title: '',
                body: '',
                urgent: false,
                general: false,
                userId: [],
                urgent: false,
                general: false,
            });
            setSelectedUsers( [] );
            //Log user
            if(window.localStorage.getItem('activeUser') != undefined
            && JSON.parse(window.localStorage.getItem('activeUser')) != null)
            {
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
            //log guard
            if(window.localStorage.getItem('activeGuard') != undefined
            && JSON.parse(window.localStorage.getItem('activeGuard')) != null)
            {
                decodeGuard( JSON.parse( window.localStorage.getItem('activeGuard') ) )
                .then( ( data ) =>
                {
                    dispatch(data);
                })
                .catch( ( error ) =>
                {
                    console.log("Error al logear guardia, promesa app.jsx: ", error);
                })
            }
		}
		catch(error)
		{
			console.error('Error creating event: ', error);
			console.log('DEFINITIVE', form);
			alert('Error creating event');
		}
	};

    return(
        <div>
            <form
				onSubmit={handleSubmit}
				className='relative bg-brown px-6 pt-10 pb-6 shadow-xl ring-gray-600/5 sm:max-w-lg sm:rounded-lg sm:px-10'>
				<fieldset>

					<div>
						<p>To: </p>
						<select name='users' onChange={handleSelectDestinatary}>
							<option value="default" disabled>Seleccionar destinatario</option>
							{allUsers.length > 0 &&
								allUsers.map((x, y) => (
									<option value={[x.id, x.name]} key={y}>
										{x.name}
									</option>
								))}
						</select>
						<br />
						{selectedUsers.length > 0 &&
							selectedUsers.map((vis, v) => {
								const name = vis.split(',')[1];
								return <div key={v}>{name}</div>;
							})}
					</div>

					<div>
						<p>title</p>
						<input type='text' name='title' value={form.title} onChange={handleChange} />
					</div>
					<br />

					<div>
						<p>body</p>
						<input type='text' name='body' value={form.body} onChange={handleChange} />
					</div>
					<br />


					<input type="checkbox" name='urgent' checked={form.urgent} onChange={handleCheckboxChange} />
					<label> URGENT </label>

                    <input type="checkbox" name='general' checked={form.general} onChange={handleCheckboxChange} />
					<label> GENERAL </label>

					<br/>

					<button type='button' onClick={()=> console.log("Form: ", form)}> FORM </button>

					<button
						type='submit'
						className=' w-48 bg-slate-400 transition duration-300 hover:bg-white'
						>
						Submit
					</button>
					<br />
				</fieldset>
			</form>
        </div>
    )
}