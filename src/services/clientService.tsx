export interface Client {
    id: number;
    nombre: string;
    apellidos: string;
    correo: string;
    empresa: string;
    puesto: string;
    telefono: string;
  }
  
  const API_URL = "http://localhost:5001";
  
  export const getClients = async (): Promise<Client[]> => {
    const response = await fetch(`${API_URL}/clients`);
    if (!response.ok) throw new Error("Error al obtener los clientes");
    return response.json();
  };
  
  // Puedes agregar funciones para POST, PUT, DELETE, etc.
  