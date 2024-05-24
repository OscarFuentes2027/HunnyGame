import React from 'react';
import Header from './components/Header/Header';
import Cartel from './components/Cartel/Cartel';
import Memorama from './components/Memorama/Memorama';
import imagenMemorama from './assets/Fotos/IMG_1739.jpg';
import imagen2 from './assets/Fotos/5728cfb3-1dd7-40e7-842f-b78bbb4e4d1d.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

const App: React.FC = () => {
  return (
    <Router basename="/HunnyGame">
      <div className="App">
        <Header title="Hunny Game Center" />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <div className="cartel-container">
                  <Cartel
                    title="Memorama"
                    image={imagenMemorama}
                    to="/memorama"
                  />
                </div>
                <div className="cartel-container">
                  <Cartel title="Pronto" image={imagen2} to="/pronto" />
                </div>
              </div>
            }
          />
          <Route
            path="/memorama"
            element={
              <div>
                <div className="cartel-container">
                  <Memorama />
                </div>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
