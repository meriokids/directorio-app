import React from "react";
import LoginForm from "../components/organisms/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (username: string, password: string) => {
    // Aquí agregar la lógica de autenticación (puedes simularla)
    if (username && password) {
      navigate("/dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <LoginForm onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
