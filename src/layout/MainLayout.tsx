import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MainLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Lógica para cerrar sesión
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Directorio de Clientes</h1>
        <nav className="space-x-4">
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/clientes" className="hover:underline">Clientes</Link>
          <button onClick={handleLogout} className="hover:underline">Cerrar Sesión</button>
        </nav>
      </header>

      {/* Contenido */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
