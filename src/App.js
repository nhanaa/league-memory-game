import './App.css';
// import {useEffect, useState} from 'react';
import {HashRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import useSound from 'use-sound';
import Home from './Home';
import Options from './Options';
import About from './About.js';
import { useState } from 'react';


function App() {
  const [play, {stop}] = useSound(process.env.PUBLIC_URL + "/audio/happy-journey.mp3");
  const [musicActive, setMusicActive] = useState(true); 

  const toggleMusic = () => {
    setMusicActive(!musicActive);
    stop();
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App-content">
          <Routes>
            <Route exact path="/" element={<Home playBGM={play} stopBGM={stop} musicActive={musicActive}/>} />
            <Route path="/options" element={<Options handleToggle={toggleMusic} isOn={musicActive}/>}/>
            <Route path="/about" element={<About/>}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
