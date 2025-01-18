import { useState } from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import UserContext from "./contexts/UserContext";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import HomeScreen from "./pages/HomeScreen";
import ProfileScreen from "./pages/ProfileScreen";
import NewProductScreen from "./pages/NewProductScreen";
import FavoritesScreen from "./pages/FavoritesScreen";
import './styles/App.css'
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginScreen/>}/>
          <Route path="/register" element={<RegisterScreen/>}/>
          <Route path="/home" element={<HomeScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
          <Route path="/new-prod" element={<NewProductScreen/>}/>
          <Route path="/fav" element={<FavoritesScreen/>}/>
        </Routes>
      </Router>
    </UserContext.Provider>
  )
}

export default App
