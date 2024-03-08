import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { CreateUser } from './Components/Create/CreateUser/CreateUser'
import { CreateVisit } from './Components/Create/CreateVisit/CreateVisit'
import { NavBar } from './Components/NavBar/NavBar'
import { E404 } from './Components/Views/404/E404'
import { EventCard } from './Components/Views/Calendar/EventCard/EventCard'
import { DUserDetail } from './Components/Views/Dashboard/DUserDetail/DUserDetail'
import { DUsers } from './Components/Views/Dashboard/DUsers/DUsers'
import { Dashboard } from './Components/Views/Dashboard/Dashboard'
import { GSideBar } from './Components/Views/Guard/GSideBar/GSideBar'
import { Guard } from './Components/Views/Guard/Guard'
import { Home } from './Components/Views/Home/Home'
import { Landing } from './Components/Views/Landing/Landing'
import { Login } from './Components/Views/Login/Login'
import { LoginGuard } from './Components/Views/LoginGuard/LoginGuard'
import { MyProfile } from './Components/Views/MyProfile/MyProfile'
import { decodeGuard, decodeUser } from './Redux/actions/actions'

function App() {
	const location = useLocation()
	const dispatch = useDispatch()
	const {activeUser, activeGuard, myProfileToMount} = useSelector(state => state)
	const ruta = location.pathname;

	useEffect(() =>
	{
		//log user
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
		//
	}, [ruta, myProfileToMount])

	return (
		<div className='h-screen'>
			{location.pathname !== '/' && <NavBar />}
			{ (activeGuard && location.pathname.includes('guard')) && <GSideBar />}
			<Routes>
				<Route path='*' element={<E404 />} />
				<Route path='/' element={<Landing />} />
				<Route path='/home' element={<Home />} />
				{!activeUser && <Route path='/createuser' element={<CreateUser />} />}
				{activeUser && <Route path='/createvisit' element={<CreateVisit />} />}
				{ (!activeUser && !activeGuard ) && <Route path='/login' element={<Login />} />}
				{ (!activeUser && !activeGuard ) && <Route path='/glogin' element={<LoginGuard />} />}
				{activeUser && <Route path='/myprofile' element={<MyProfile />} />}
				{activeGuard && <Route path='/guard' element={ <Guard /> } />}
				{activeGuard && <Route path='/guard/users' element={<DUsers/>} />}
				{activeGuard && <Route path='/guard/user' element={<DUserDetail />} />}
				{ (activeUser && activeUser.isAdmin) && <Route path='/dashboard' element={<Dashboard />} />}
				<Route path='/event/:id' element={<EventCard/>} />
			</Routes>
			{/* <Footer /> */}
		</div>
	)
}

export default App
