import { useAuth } from "../context/AuthContext";
import googleIcon from "../assets/google-icon.png"; // make sure this path is correct
import "../styles/Login.css"; // Link your CSS file

export default function Login() {
  const { login } = useAuth();

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">📝 Nivas's Todo App</h1>
        <p className="login-subtitle">Sign in with Google to manage your tasks</p>

        <button className="google-btn" onClick={login}>
          <img src={googleIcon} style={{ width: "16px", height: "16px", objectFit: "contain" }} className="google-icon" />
          <span>Sign in with Google</span>
        </button>

        <p className="login-footer">Secure login via Firebase Authentication</p>
      </div>
    </div>
  );
}
