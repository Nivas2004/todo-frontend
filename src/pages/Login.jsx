import { useAuth } from "../context/AuthContext";
import googleIcon from "../assets/google-icon.png";
import "../styles/Login.css";
import axios from "axios"; // ✅ Import axios
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login(); // This sets the token in localStorage
      const token = localStorage.getItem("token");

      // ✅ Call backend with token
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Tasks fetched after login:", res.data);

      // Optional: Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("❌ Login or fetch failed:", err);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">📝 Nivas's Todo App</h1>
        <p className="login-subtitle">Sign in with Google to manage your tasks</p>

        <button className="google-btn" onClick={handleLogin}>
          <img
            src={googleIcon}
            style={{ width: "16px", height: "16px", objectFit: "contain" }}
            className="google-icon"
            alt="Google icon"
          />
          <span>Sign in with Google</span>
        </button>

        <p className="login-footer">Secure login via Firebase Authentication</p>
      </div>
    </div>
  );
}
