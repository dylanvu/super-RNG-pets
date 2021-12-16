import './App.css';
import { useState } from 'react';
import { GenerateRandom } from './lib/random';
import { actionMap, freezeMap } from './lib/maps';


function App() {
  const [turn, setTurn] = useState(1);
  const [rolling, setRolling] = useState(false)
  const [number, setNumber] = useState();
  const [action, setAction] = useState("Click to Roll");

  const Roll = () => {
    // Generate 5 random numbers
    setRolling(true)
    let random = []
    for (let i = 0; i < 7; i++) {
      if (turn < 3) {
        random.push(GenerateRandom(1, 6));
      } else if (turn < 5) {
        random.push(GenerateRandom(1, 7));
      } else if (turn < 9) {
        random.push(GenerateRandom(1, 8));
      } else {
        random.push(GenerateRandom(1, 9));
      }
    }
    let index = 0;
    // Now cycle through
    let cycle = () => {
      setNumber(random[index]);
      setAction(actionMap[random[index]]);
      index++;
      if (index < random.length) {
        setTimeout(cycle, 100);
      } else {
        setRolling(false)
      }
    }
    setTimeout(cycle, 100);
  }

  return (
    <div className="App">
      <div className="number">{number}</div>
      <div className="action">{action}</div>
      <button onClick={(e) => {
        if (!rolling) {
          Roll();
        }
      }}>{ rolling ? "Rolling..." : "Roll!"}</button>
      <div className="turn">Turn: {turn}</div>
      <button onClick={(e) => {
        setTurn(turn + 1);
      }}>Next Turn</button>
    </div>
  );
}

export default App;
