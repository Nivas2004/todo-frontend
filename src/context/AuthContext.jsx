import { createContext, useContext, useState, useEffect } from "react";
import { loginWithGoogle } from "../firebase";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async () => {
    try {
      const result = await loginWithGoogle();
      const { displayName, email } = result.user;

      // ✅ Send to backend to get JWT
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/google`,
        { name: displayName, email }
      );

      // ✅ Save user and token
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token); // ✅ this must happen

      console.log("✅ Token saved to localStorage");
    } catch (err) {
      console.error("❌ Login failed:", err.message);
    }
  };

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login }}>
      {children}
    </AuthContext.Provider>
  );
};
