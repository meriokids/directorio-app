import React, { useEffect, useState } from "react";
import Table from "../molecules/Table";
import Button from "../atoms/Button";
import Input from "../atoms/Input";
import EditClientModal from "../../pages/EditClientModal";
import { getClients } from "../../services/clientService";
import axios from "axios";
import { FaPen, FaTrash } from "react-icons/fa";

interface Client {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  empresa: string;
  puesto: string;
  telefono: string;
}

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);

  const recordsPerPage = 10;

  useEffect(() => {
    getClients().then((data) => setClients(data));
  }, []);

  // Filtrar clientes según el término de búsqueda
  const filteredClients = clients.filter((client) =>
    `${client.nombre} ${client.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginación
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredClients.length / recordsPerPage);

  // Eliminar cliente (desactivar)
  const handleDeactivateClient = async (id: number) => {
    try {
      await axios.delete(`https://service-directorio-app.onrender.com/clients/${id}`);
      setClients(clients.filter((client) => client.id !== id));
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  };

  // Abrir modal de edición
  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setIsModalOpen(true);
  };

  // Guardar cambios en la edición
  const handleSaveEdit = async () => {
    if (editingClient) {
      try {
        await axios.put(`https://service-directorio-app.onrender.com/clients/${editingClient.id}`, editingClient);
        setClients(clients.map((c) => (c.id === editingClient.id ? editingClient : c)));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Error al actualizar cliente:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-12/12"
        />
      </div>

      <Table
        headers={["Nombre", "Apellidos", "Correo", "Empresa", "Puesto", "Teléfono", "Acciones"]}
        data={currentClients}
        renderRow={(client: Client) => (
          console.log("rendering row:", client),
          <>
            <td className="border px-4 py-2">{client.nombre}</td>
            <td className="border px-4 py-2">{client.apellidos}</td>
            <td className="border px-4 py-2">{client.correo}</td>
            <td className="border px-4 py-2">{client.empresa}</td>
            <td className="border px-4 py-2">{client.puesto}</td>
            <td className="border px-4 py-2">{client.telefono}</td>
            <td className="border px-4 py-2">
              <div className="flex space-x-2">
              <Button label="" icon={FaPen} onClick={() => handleEditClient(client)} />
              <Button
                label=""
                icon={FaTrash}
                onClick={() => handleDeactivateClient(client.id)}
                className="bg-yellow-500 hover:bg-yellow-600"
              />
              </div>
            </td>
          </>
        )}
      />

      {/* Paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 border rounded ${currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Modal para editar cliente */}
      {editingClient && (
        <EditClientModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          client={editingClient}
          setClient={setEditingClient}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
};

export default ClientTable;
