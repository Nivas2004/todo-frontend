import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  const { token } = useAuth();

  return (
    <Routes>
      {!token ? (
        <Route path="*" element={<Login />} />
      ) : (
        <Route path="*" element={<Dashboard />} />
      )}
    </Routes>
  );
}
