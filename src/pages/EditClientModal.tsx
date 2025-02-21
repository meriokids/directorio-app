import React from "react";
import Modal from "./../components/molecules/Modal";
import Input from "./../components/atoms/Input";
import Button from "./../components/atoms/Button";

interface EditClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: any;
  setClient: (client: any) => void;
  onSave: () => void;
}

const EditClientModal: React.FC<EditClientModalProps> = ({ isOpen, onClose, client, setClient, onSave }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Editar Cliente">
      <div className="grid gap-4">
        <Input name="nombre" value={client.nombre} onChange={(e) => setClient({ ...client, nombre: e.target.value })} />
        <Input name="apellidos" value={client.apellidos} onChange={(e) => setClient({ ...client, apellidos: e.target.value })} />
        <Input name="correo" value={client.correo} onChange={(e) => setClient({ ...client, correo: e.target.value })} />
        <Input name="empresa" value={client.empresa} onChange={(e) => setClient({ ...client, empresa: e.target.value })} />
        <Input name="puesto" value={client.puesto} onChange={(e) => setClient({ ...client, puesto: e.target.value })} />
        <Input name="telefono" value={client.telefono} onChange={(e) => setClient({ ...client, telefono: e.target.value })} />
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button onClick={onClose} label="Cancelar" />
        <Button onClick={onSave} label="Guardar" />
      </div>
    </Modal>
  );
};

export default EditClientModal;
