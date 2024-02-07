const initialstate = 
{

}

const rootReducer = (state = initialstate, {type, payload}) => 
{
	switch (type) 
    {
		default:
			return {...state}
	}
}

export default rootReducer
