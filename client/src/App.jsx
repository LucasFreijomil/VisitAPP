import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { CreateUser } from './Components/Create/CreateUser/CreateUser'
import { CreateVisit } from './Components/Create/CreateVisit/CreateVisit'
import Footer from './Components/Footer/Footer'
import { NavBar } from './Components/NavBar/NavBar'
import { E404 } from './Components/Views/404/E404'
import { Dashboard } from './Components/Views/Dashboard/Dashboard'
import { Home } from './Components/Views/Home/Home'
import { Landing } from './Components/Views/Landing/Landing'
import { Login } from './Components/Views/Login/Login'
import { MyProfile } from './Components/Views/MyProfile/MyProfile'
import { decodeUser } from './Redux/actions/actions'

function App() {
	const location = useLocation()
	const dispatch = useDispatch()
	const {activeUser} = useSelector(state => state)

	useEffect(() =>
	{
		if(JSON.parse(window.localStorage.getItem('activeUser')) != null)
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
	}, [])

	return (
		<div className='h-screen'>
			{location.pathname !== '/' && <NavBar />}
			<Routes>
				<Route path='*' element={<E404 />} />
				<Route path='/' element={<Landing />} />
				<Route path='/home' element={<Home />} />
				{activeUser && <Route path='/createuser' element={<CreateUser />} />}
				{activeUser && <Route path='/createvisit' element={<CreateVisit />} />}
				<Route path='/login' element={<Login />} />
				{/* { (activeUser && activeUser.isAdmin) && <Route path="/dashboard" element={ <Dashboard /> } /> } */}
				{activeUser && <Route path='/myprofile' element={<MyProfile />} />}
				{ (activeUser && activeUser.isAdmin) && <Route path='/dashboard' element={<Dashboard />} />}
			</Routes>
			<Footer />
		</div>
	)
}

export default App
