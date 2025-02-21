import React from "react";

interface CardProps {
  client: {
    nombre: string;
    apellidos: string;
    correo: string;
    empresa: string;
    puesto: string;
    telefono: string;
  };
}

const Card: React.FC<CardProps> = ({ client }) => {
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-bold text-lg">
        {client.nombre} {client.apellidos}
      </h3>
      <p>{client.correo}</p>
      <p>{client.empresa} - {client.puesto}</p>
      <p>{client.telefono}</p>
    </div>
  );
};

export default Card;
