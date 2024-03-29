import axios from 'axios';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decodeGuard, decodeUser } from "../../Redux/actions/actions";

export const Messages = ({ showMessagesComponent, thisUser, setShowMessagesComponent }) =>
{
    const activeUser = useSelector( state => state.activeUser );
    const dispatch = useDispatch();
    let url = 'http://localhost:3001/users';
    const [ allUsers, setAllUsers ] = useState([]);
    const [ allIds, setAllIds ] = useState([]);
    const [ selectedUsers, setSelectedUsers ] = useState( [] );
    const [ form, setForm ] = useState(
        {
            title: '',
            body: '',
            urgent: false,
            general: false,
            userId: [],
        }
    )

    useEffect( () =>
    {
        axios.get(`${url}`)
        .then( ( { data} ) =>
        {
            setAllUsers(data);
            console.log(data);
        })
        .catch( ( error ) =>
        {
            console.log("Error fetching allUsers: ", error);
        })
    }, [])

    useEffect( () =>
    {
        setAllIds( allUsers.map( user => user.id ) );
    }, [allUsers])

    useEffect(() =>
    {
        showMessagesComponent && setForm( { ...form, userId: [ thisUser.id ] } )
        console.log("FORMULARIOOOOO", form);
    }, [])

    const handleChange = (e) =>
    {
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
        if(e.target.name=='general')
        {
            if(e.target.checked)
            {
                setForm( { ...form, [e.target.name]: e.target.checked, userId: allIds } );
            }
            else
            {
                let onlyIds = selectedUsers.map( user => user.split(',')[0] );
                setForm( { ...form, [e.target.name]: e.target.checked, userId: onlyIds } );
            }
        }
        else
        {
            setForm( { ...form, [e.target.name]: e.target.checked } );
        }
	}

    const handleSubmit = async (event) => {
		event.preventDefault();

		try
		{
            await axios.post('http://localhost:3001/messages', form);
            console.log("Envió este form: ", form);
			alert('Message sent!');
			setForm({
                title: '',
                body: '',
                urgent: false,
                general: false,
                userId: []
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
        
            <button onClick={() => {console.log(allIds); console.log("FORMULARIO: ", form);}}> SHOW </button>
            {showMessagesComponent && <button onClick={() => {setShowMessagesComponent(false)}} className=' bg-orange-50'>{"< VOLVER"}</button>}
            <form
				onSubmit={handleSubmit}
				className='relative bg-brown px-6 pt-10 pb-6 shadow-xl ring-gray-600/5 sm:max-w-lg sm:rounded-lg sm:px-10'>
				<fieldset>

                    {!showMessagesComponent && <div> 
                        <input type="checkbox" name='general' checked={form.general} onChange={handleCheckboxChange} />
                        <label> GENERAL </label>
                    </div>}

					<div>
						<p>To: </p>
						{!form.general && !showMessagesComponent && <>
                        <select name='users' onChange={handleSelectDestinatary}>
							<option value="default" >Seleccionar destinatario</option>
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
							})}</>}

                    { form.general && !showMessagesComponent ? (<div> Every user </div>) : (<div>{thisUser?.name} {thisUser?.surname}</div>) }

                    <br />

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