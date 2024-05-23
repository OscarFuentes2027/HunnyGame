// En el componente Cartel.tsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link desde react-router-dom
import './Cartel.css';

interface CartelProps {
  title: string;
  image: string;
  to: string; // Nuevo prop para la URL de destino
}

const Cartel: React.FC<CartelProps> = ({ title, image, to }) => {
  return (
    <div className="container">
      <Link to={to} className="square">
        <img src={image} alt="Logo del juego" className="square-image" />
        <h1 className="text">{title}</h1>
      </Link>
    </div>
  );
};

export default Cartel;

