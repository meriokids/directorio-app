import { useState, ChangeEvent } from "react";
import axios from "axios";
import Button from "./../components/atoms/Button";
import Input from "./../components/atoms/Input";
import Modal from "./../components/molecules/Modal";

// Definimos las props del componente
interface AddClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (client: ClientType) => void;
}

// Definimos la estructura de un cliente
interface ClientType {
  id?: number;
  nombre: string;
  apellidos: string;
  correo: string;
  empresa: string;
  puesto: string;
  telefono: string;
}

export default function AddClientModal({ isOpen, onClose, onSave }: AddClientModalProps) {
  const [newClient, setClient] = useState<ClientType>({
    nombre: "",
    apellidos: "",
    correo: "",
    empresa: "",
    puesto: "",
    telefono: ""
  });

  // Manejar cambios en los inputs
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value
    }));
  };

  // Manejar envío del formulario
  const handleSubmit = async () => {
    try {
      const response = await axios.post("https://service-directorio-app.onrender.com/clients", newClient);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error("Error guardando cliente:", error);
    }
  };



  return (
    <Modal title="Agregar Cliente" isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-white rounded-lg shadow-md max-w-lg w-full">
        <h2 className="text-xl font-semibold mb-4">Agregar Cliente</h2>
        <div className="grid gap-4">
          <Input name="nombre" placeholder="Nombre" value={newClient.nombre} onChange={handleChange} />
          <Input name="apellidos" placeholder="Apellidos" value={newClient.apellidos} onChange={handleChange} />
          <Input name="correo" type="email" placeholder="Correo" value={newClient.correo} onChange={handleChange} />
          <Input name="empresa" placeholder="Empresa" value={newClient.empresa} onChange={handleChange} />
          <Input name="puesto" placeholder="Puesto" value={newClient.puesto} onChange={handleChange} />
          <Input name="telefono" placeholder="Teléfono" value={newClient.telefono} onChange={handleChange} />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onClose} label="Cancelar">Cancelar</Button>
          <Button onClick={handleSubmit} label="Guardar">Guardar</Button>
        </div>
      </div>
    </Modal>
  );
}
