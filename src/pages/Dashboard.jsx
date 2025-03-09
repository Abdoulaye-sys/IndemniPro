import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../assets/styles/Dashboard.css";

function Dashboard() {
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [indemnisations, setIndemnisations] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login"); // ✅ Redirige si l'utilisateur n'est pas connecté
    } else {
      fetchIndemnisations();
    }
  }, [user, navigate]);

  const fetchIndemnisations = async () => {
    try {
      const response = await fetch("https://backend-indem.onrender.com/api/indemnisations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du chargement des indemnisations.");
      }

      const data = await response.json();
      setIndemnisations(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!user) return null; // ✅ Empêche l'affichage si l'utilisateur n'est pas encore chargé

  return (
    <div className="dashboard-container">
      <h2>Bienvenue, {user?.name} 👋</h2>
      <p>Email : {user?.email}</p>
      <p>Votre tableau de bord personnalisé.</p>

      {/* Section des indemnisations */}
      <div className="indemnisations-section">
        <h3>💼 Indemnisations</h3>
        <table className="indemnisations-table">
          <thead>
            <tr>
              <th>Date de demande</th>
              <th>Montant (€)</th>
              <th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {indemnisations.length > 0 ? (
              indemnisations.map((indemnisation) => (
                <tr key={indemnisation.id}>
                  <td>{new Date(indemnisation.date_demande).toLocaleDateString()}</td>
                  <td>{indemnisation.montant}</td>
                  <td>{indemnisation.statut || "En attente"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">Aucune indemnisation disponible.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
