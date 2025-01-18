import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
    return(
        <nav className="navbar">
            <ul className="navbar-links">
                <li><Link to="/home">Home</Link></li>
                <li><Link to="/new-prod">New Product</Link></li>
                <li><Link to="/fav">Favorites</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;