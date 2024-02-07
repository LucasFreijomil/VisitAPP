import { Route, Routes, useLocation } from "react-router-dom";
import './App.css';
import { CreateUser } from "./Components/Create/CreateUser/CreateUser";
import { CreateVisit } from "./Components/Create/CreateVisit/CreateVisit";
import { NavBar } from "./Components/NavBar/NavBar";
import { Home } from './Components/Views/Home/Home';
import { Landing } from "./Components/Views/Landing/Landing";

function App() {
  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" && <NavBar />}
      <Routes>

        <Route path="/" element={ <Landing /> } />
        <Route path="/home" element={ <Home /> } />
        <Route path="/createuser" element={ <CreateUser /> } />
        <Route path="/createvisit" element={ <CreateVisit /> } />

      </Routes>
    </div>
  )
}

export default App
