// Cmemo.tsx
import React from 'react';

interface CmemoProps {
  image: string;
  isFlipped: boolean;
}

const Cmemo: React.FC<CmemoProps> = ({ image, isFlipped }) => {
  return (
    <div className={`card-inner ${isFlipped ? 'flipped' : ''}`}>
      {isFlipped ? <img src={image} alt="Carta" /> : <div className="card-back"></div>}
    </div>
  );
};

export default Cmemo;
