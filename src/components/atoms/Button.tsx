import React from "react";
import { IconType } from "react-icons";


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({ label, icon: Icon, className, ...props }) => {
  return (
    <button
      className={`flex  items-center bg-avocado-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition ${className}`}
      {...props}
    >
       {Icon && <Icon className="mx-2" />} {/* Renderiza el ícono directamente */}

      {label}
    </button>
  );
};

export default Button;
