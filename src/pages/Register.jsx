import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Pour rediriger après inscription
import "../assets/styles/Register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook pour redirection

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      console.log("Inscription réussie:", data);
      navigate("/login"); // Redirection vers la page de connexion
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="register-container">
      <h2>Inscription</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="register-form">
        <label>Nom:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Mot de passe:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />

        <button type="submit" className="btn-primary">S'inscrire</button>
      </form>
    </div>
  );
}

export default Register;
