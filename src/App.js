import './App.css'
import React, { useState, useEffect } from "react"

function App() {
  const [power, setPower] =useState(true);
  const [volume, setVolume] =useState(0.5);
  const [display,setDisplay] =useState('');

  const audioClips = {
  Q:{id: 'clap', src:'sounds/clap.wav'},
  W:{id: 'cowbell', src:'sounds/cowbell.wav'},
  E:{id: 'crash', src:'sounds/crash.wav'},
  A:{id: 'hithat', src:'sounds/hithat.wav'},
  S:{id: 'kick', src:'sounds/kick.wav'},
  D:{id: 'openhat', src:'sounds/openhat.wav'},
  Z:{id: 'perc', src:'sounds/perc.wav'},
  X:{id: 'snare', src:'sounds/snare.wav'},
  C:{id: 'tom', src:'sounds/tom.wav'}
  };

  function handleCLick(e){
    if(power){
      const audio = document.getElementById(e.target.innerText);
      if(audio){
        audio.volume =volume;
        audio.currentTime =0;
        audio.play();
        setDisplay(e.target.id);
      }
    }
  }

  useEffect(() => {
    function handleKeydown(e) {
      if (power) {
        const key = e.key.toUpperCase();
        const audio = document.getElementById(key);
        if (audio) {
          audio.volume = volume;
          audio.currentTime = 0;
          audio.play();
          setDisplay(audioClips[key].id);
        }
      }
    }

    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  }, [power, volume]);

  function handleVolumeChange(e){
    const volumeLevel= e.target.value;
    setVolume(volumeLevel);
    setDisplay(`Volume: ${volumeLevel * 100}`)
  }

  return (
   <div className = "App">
   <div className="container" id="drum-machine">
   <div id="display">{display}</div>
   <div>
    <label htmlFor="power">Power</label>
    <input 
    type="checkbox" 
    id="power" 
    checked={power} 
    onChange={()=> setPower(!power) }/>
   </div>
   <div>
    <input
     type="range" id="volume"
     min="0" max="1" step="0.01"
     value={volume} onChange={handleVolumeChange}
     disabled={!power}
     />
   </div>
   {Object.keys(audioClips).map((key) =>(
    <button 
    className="drum-pad"
    id={audioClips[key].id}
    onClick={handleCLick}
    key={key}
    disabled={!power}>
      {key}
      <audio className="clip" id={key} src={audioClips[key].src}></audio>
    </button>
   ))}
   </div>
   </div>
  );
}

export default App;
