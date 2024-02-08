import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import { CreateUser } from "./Components/Create/CreateUser/CreateUser";
import { CreateVisit } from "./Components/Create/CreateVisit/CreateVisit";
import { NavBar } from "./Components/NavBar/NavBar";
import { E404 } from "./Components/Views/404/E404";
import { Dashboard } from "./Components/Views/Dashboard/Dashboard";
import { Home } from './Components/Views/Home/Home';
import { Landing } from "./Components/Views/Landing/Landing";
import { Login } from "./Components/Views/Login/Login";
import { logInUser, logOffUser } from "./Redux/actions/actions.JS";

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { activeUser } = useSelector( state => state );

  useEffect( () =>
  {
    if(JSON.parse(window.localStorage.getItem('activeUser'))!=null)
    {
      dispatch( logInUser( JSON.parse( window.localStorage.getItem('activeUser') ) ) );
    }
    else
    {
      dispatch(logOffUser());
    }
  }, [])

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>

        <Route path="*" element={ <E404 /> } />
        <Route path="/" element={ <Landing /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/createuser" element={ <CreateUser /> } />
        <Route path="/createvisit" element={ <CreateVisit /> } />
        <Route path="/login" element={ <Login /> } />
        { (activeUser && activeUser.isAdmin) && <Route path="/dashboard" element={ <Dashboard /> } /> }

      </Routes>
    </div>
  )
}

export default App