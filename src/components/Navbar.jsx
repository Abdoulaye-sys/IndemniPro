import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "../assets/styles/navbar.css";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // ✅ Redirection après déconnexion
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">IndemniPro</Link>
      <ul className="navbar-menu">
        <li><Link to="/">Accueil</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Connexion</Link></li>
            <li><Link to="/register">Inscription</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li>
              <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
