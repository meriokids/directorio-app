import React, { useState } from "react";
import ClientTable from "../components/organisms/ClientTable";
import Button from "../components/atoms/Button";
import AddClientModal from "./AddClientModal";

// Importa la interfaz de cliente (debe coincidir con la usada en `AddClientModal`)
import { ClientType } from "../types/ClientType"; 
import { FaHome } from "react-icons/fa";

const DashboardPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  // Tipamos `newClient` correctamente
  const handleSaveClient = (newClient: ClientType) => {
    console.log("Nuevo cliente guardado:", newClient);
    handleCloseModal();
  };

  return (
    <>
      <div>
        <div className="flex justify-end mb-4">
          <Button onClick={handleOpenModal} label="Agregar Nuevo Cliente" icon={FaHome} />
        </div>

        {/* Modal para agregar cliente */}
        <AddClientModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSave={handleSaveClient}
        />
      </div>
      <ClientTable />
    </>
  );
};

export default DashboardPage;
