import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../assets/styles/Home.css";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="home-container">
      <header className="home-banner">
        <h1>Bienvenue sur l'application d'indemnisation</h1>
        <p>Simplifiez vos démarches et suivez vos indemnités en toute transparence.</p>
        <div className="home-buttons">
          {!user ? (
            <>
              <Link to="/register" className="btn-primary">Créer un compte</Link>
              <Link to="/login" className="btn-secondary">Se connecter</Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn-primary">Accéder au Dashboard</Link>
          )}
        </div>
      </header>

      {/* ✅ Section remise en bas */}
      <section className="home-features">
        <div className="feature">
          <h2>💼 Suivi des paiements</h2>
          <p>Consultez vos indemnités en temps réel et suivez l'historique de vos paiements.</p>
        </div>
        <div className="feature">
          <h2>📄 Documents en ligne</h2>
          <p>Déposez et téléchargez vos documents administratifs en toute simplicité.</p>
        </div>
        <div className="feature">
          <h2>🛠️ Assistance</h2>
          <p>Obtenez de l’aide rapidement grâce à notre support dédié.</p>
        </div>
      </section>
    </div>
  );
}

export default Home;
