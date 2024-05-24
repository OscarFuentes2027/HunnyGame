import React, { useState, useEffect } from "react";
import Cmemo from "../Cmemo/Cmemo";
import './Memorama.css'; // Importa el archivo CSS
import img1 from '../../assets/Fotos/texana.jpg';
import img2 from '../../assets/Fotos/OIP.jpg';
import img3 from '../../assets/Fotos/Misfits-Logo.png';
import img4 from '../../assets/Fotos/drawing.png';
import img5 from '../../assets/Fotos/ff.jpg';
import img6 from '../../assets/Fotos/gabumon_icon_for_you_guys_by_sarahrichford_dedfto0-pre.jpg';
import img7 from '../../assets/Fotos/helldivers2.jpg';
import img8 from '../../assets/Fotos/kill.jpg';
import img9 from '../../assets/Fotos/konan.jpg';
import img10 from '../../assets/Fotos/mine.jpg';
import img11 from '../../assets/Fotos/natanael-cano-estrena-nuevo-material-discografico-1-1024x576.png';
import img12 from '../../assets/Fotos/pp.jpg';

interface Carta {
  id: number;
  image: string;
}

const imagenes = [
  img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12,
];

const Memorama: React.FC = () => {
  const [dificultad, setDificultad] = useState<string>('normal');
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [cartasVolteadas, setCartasVolteadas] = useState<number[]>([]);
  const [parejasEncontradas, setParejasEncontradas] = useState<number[]>([]);
  const [tiempoRestante, setTiempoRestante] = useState<number>(60);
  const [mensaje, setMensaje] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [juegoIniciado, setJuegoIniciado] = useState<boolean>(false);

  useEffect(() => {
    const cartasAleatorias = imagenes
      .sort(() => Math.random() - 0.5)
      .slice(0, dificultad === 'normal' ? 6 : 12)
      .map((image, index) => ({ id: index, image }));

    const cartasDuplicadas = cartasAleatorias.concat(
      cartasAleatorias.map((carta) => ({ ...carta, id: carta.id + (dificultad === 'normal' ? 6 : 12) }))
    );

    const cartasMezcladas = [...cartasDuplicadas].sort(() => Math.random() - 0.5);
    setCartas(cartasMezcladas);
  }, [dificultad]);

  useEffect(() => {
    if (dificultad === 'normal') {
      setTiempoRestante(60);
    } else {
      setTiempoRestante(145); // Cambio de tiempo para dificultad "dificil"
    }
  }, [dificultad]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (juegoIniciado) {
      timer = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(timer);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [juegoIniciado]);

  useEffect(() => {
    if (parejasEncontradas.length === (dificultad === 'normal' ? 12 : 24)) {
      setMensaje('¡Ganaste!');
      setJuegoIniciado(false); // Detener el temporizador al ganar
    }
  }, [parejasEncontradas, dificultad]);

  useEffect(() => {
    if (tiempoRestante === 0) {
      setMensaje('Perdiste. ¡Intenta de nuevo!');
      setJuegoIniciado(false); // Detener el temporizador al perder
    }
  }, [tiempoRestante]);

  const voltearCarta = (index: number) => {
    if (!juegoIniciado) {
      setJuegoIniciado(true);
    }

    if (
      isChecking ||
      cartasVolteadas.includes(index) ||
      parejasEncontradas.includes(cartas[index].id)
    ) {
      return;
    }

    const nuevasCartasVolteadas = [...cartasVolteadas, index];
    setCartasVolteadas(nuevasCartasVolteadas);

    if (nuevasCartasVolteadas.length === 2) {
      setIsChecking(true);
      const [primeraIndex, segundaIndex] = nuevasCartasVolteadas;
      const primeraCarta = cartas[primeraIndex];
      const segundaCarta = cartas[segundaIndex];

      if (primeraCarta.image === segundaCarta.image) {
        setParejasEncontradas((prev) => [...prev, primeraCarta.id, segundaCarta.id]);
        setCartasVolteadas([]);
        setIsChecking(false);
      } else {
        setTimeout(() => {
          setCartasVolteadas([]);
          setIsChecking(false);
        }, 1000); // Mantiene la segunda carta levantada
      }
    }
  };

  const reiniciarJuego = () => {
    setMensaje('');
    setParejasEncontradas([]);
    setCartasVolteadas([]);
    setJuegoIniciado(false);
    setTiempoRestante(dificultad === 'normal' ? 60 : 145); // Reinicia el tiempo según la dificultad
    const cartasAleatorias = imagenes
      .sort(() => Math.random() - 0.5)
      .slice(0, dificultad === 'normal' ? 6 : 12)
      .map((image, index) => ({ id: index, image }));

    const cartasDuplicadas = cartasAleatorias.concat(
      cartasAleatorias.map((carta) => ({ ...carta, id: carta.id + (dificultad === 'normal' ? 6 : 12) }))
    );

    const cartasMezcladas = [...cartasDuplicadas].sort(() => Math.random() - 0.5);
    setCartas(cartasMezcladas);
  };

  const siguienteNivel = () => {
    setMensaje('');
    setParejasEncontradas([]);
    setCartasVolteadas([]);
    setDificultad('dificil');
    setJuegoIniciado(false);
    setTiempoRestante(145);
    const cartasAleatorias = imagenes
      .sort(() => Math.random() - 0.5)
      .slice(0, 12)
      .map((image, index) => ({ id: index, image }));

    const cartasDuplicadas = cartasAleatorias.concat(
      cartasAleatorias.map((carta) => ({ ...carta, id: carta.id + 12 }))
    );

    const cartasMezcladas = [...cartasDuplicadas].sort(() => Math.random() - 0.5);
    setCartas(cartasMezcladas);
  };

  return (
    <div className="memorama-container">
      <div className="header">
        <div className="timer">Tiempo restante: {tiempoRestante}s</div>
        {mensaje && <div className="message">{mensaje}</div>}
      </div>
      <div className="memorama">
        {cartas.map((carta, index) => (
          <div
            key={index}
            className={`card ${cartasVolteadas.includes(index) || parejasEncontradas.includes(carta.id) ? 'volteada' : ''}`}
            onClick={() => voltearCarta(index)}
          >
            <Cmemo
              image={carta.image}
              isFlipped={cartasVolteadas.includes(index) || parejasEncontradas.includes(carta.id)}
            />
          </div>
        ))}
      </div>
      {mensaje && <button onClick={reiniciarJuego} className="reiniciar-boton">Volver a Jugar</button>}
      {mensaje === '¡Ganaste!' && <button onClick={siguienteNivel} className="siguiente-nivel">Siguiente Nivel</button>}
    </div>
  );
};

export default Memorama;
