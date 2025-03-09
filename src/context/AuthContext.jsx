import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // ✅ Ajouter le token dans le state

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token"); // ✅ Charger le token depuis localStorage

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken); // ✅ Stocker le token dans le state
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token); // ✅ Mettre à jour le token
  };

  const logout = (navigate) => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null); // ✅ Réinitialiser le token
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
