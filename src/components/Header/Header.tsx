// Header.tsx
import React from 'react';
import './Header.css'; // Importar estilos

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
