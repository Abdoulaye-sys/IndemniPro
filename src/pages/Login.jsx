import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../assets/styles/Login.css"; // ✅ Assure-toi que ce fichier est bien importé

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // ✅ Utilisation du contexte

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // Utilisation de la variable d'environnement REACT_APP_API_URL
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erreur lors de la connexion");
      }

      login(data.user, data.token); // ✅ Stocke l'utilisateur et le token
      console.log("✅ Connexion réussie, redirection...");
      navigate("/dashboard"); // ✅ Redirection après connexion
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        <label>Mot de passe:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        <button type="submit" className="btn-primary">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;
