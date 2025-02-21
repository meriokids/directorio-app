import React, { useEffect, useState } from "react";
import Card from "../molecules/Card";
import Input from "../atoms/Input";
import { getClients } from './../../services/clientService';

interface Client {
  id: number;
  nombre: string;
  apellidos: string;
  correo: string;
  empresa: string;
  puesto: string;
  telefono: string;
}

const ClientCards: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  useEffect(() => {
    getClients().then((data) => setClients(data));
  }, []);

  const filteredClients = clients.filter((client) =>
    `${client.nombre} ${client.apellidos}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(filteredClients.length / recordsPerPage);

  return (
    <div>
      <div className="flex justify-start items-center mb-4">

        <Input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="min-w-12/12"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentClients.map((client) => (
          <Card key={client.id} client={client} />
        ))}
      </div>

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
    </div>
  );
};

export default ClientCards;
