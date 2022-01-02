import './App.css';
import { useState } from 'react';
import { GenerateRandom } from './lib/random';
import IsFreeWill from './lib/freewill';
import { actionMap, freezeMap } from './lib/maps';
import { ChakraProvider, Button, NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Tooltip,
  Tabs, TabList, TabPanels, Tab, TabPanel,
  Checkbox,
  Divider
  } from '@chakra-ui/react';
import { BsDice6 } from 'react-icons/bs'
import { FaLevelUpAlt, FaLevelDownAlt } from 'react-icons/fa';
import { AiOutlineQuestionCircle, AiOutlineClose } from 'react-icons/ai';
import Help from './components/help';
import Credits from './components/credits';
const {ipcRenderer} = window.require('electron');

function App() {
  const [turn, setTurn] = useState(1);
  const [rolling, setRolling] = useState(false)
  const [number, setNumber] = useState(0);
  const [action, setAction] = useState("Click to Roll");
  const [prevAction, setPrevaction] = useState("");
  const [freeze, setFreeze] = useState(false);
  const [unique, setUnique] = useState(false);
  const [free, setFree] = useState(false);
  const [freeFreq, setFreefreq] = useState(1);
  const [freeR1, setFreeR1] = useState(false);
  const Roll = () => {
    if (free && IsFreeWill(turn, freeFreq, freeR1)) {
      // Check if free will is on and it's a free will round
      setAction("Free Will");
      setNumber(0);
    } else {
      if (action !== "Click to Roll") {
        setPrevaction(action);
      }
      // Generate random numbers
      setRolling(true);
      let random = [];
      let freezeOffset = 0;
      freeze ? freezeOffset = 1 : freezeOffset = 0;
      for (let i = 0; i < 12; i++) {
        if (turn < 3) {
          random.push(GenerateRandom(1, 6 + freezeOffset));
        } else if (turn < 5) {
          random.push(GenerateRandom(1, 7 + freezeOffset));
        } else if (turn < 9) {
          random.push(GenerateRandom(1, 8 + freezeOffset));
        } else {
          random.push(GenerateRandom(1, 9 + freezeOffset));
        }
      }

      // Check if unique mode is on
      if (unique) {
        while(random.at(-1) === number) {
          random.pop();
          if (turn < 3) {
            random.push(GenerateRandom(1, 6 + freezeOffset));
          } else if (turn < 5) {
            random.push(GenerateRandom(1, 7 + freezeOffset));
          } else if (turn < 9) {
            random.push(GenerateRandom(1, 8 + freezeOffset));
          } else {
            random.push(GenerateRandom(1, 9 + freezeOffset));
          }
        }
      }

      let index = 0;
      // Now cycle through for an "animation" and settle on the last option
      let cycle = () => {
        setNumber(random[index]);
        freeze ? setAction(freezeMap[random[index]]) : setAction(actionMap[random[index]]);
        // setAction(actionMap[random[index]]);
        index++;
        if (index < random.length) {
          setTimeout(cycle, 40);
        } else {
          setRolling(false)
        }
      }
      setTimeout(cycle, 10);
    }
  }

  const Reset = () => {
    setTurn(1);
    setAction("Click to Roll");
    setPrevaction("");
  }

  const ChangeTurn = (newTurn) => {
    // Make sure turn is > 0
    if (newTurn <= 0) {
      setTurn(1);
    } else {
      setTurn(newTurn);
    }
  }

  return (
    <ChakraProvider>
      <div className="App">
        <div className="title-bar">Super RNG Pets</div>
        <Tabs>
          <TabList>
            <Tab onClick={(e) => {ipcRenderer.send('shrink')}}>Roll</Tab>
            <Tab onClick={(e) => {ipcRenderer.send('large')}}>Settings</Tab>
            <Tab onClick={(e) => {ipcRenderer.send('large')}}>Help</Tab>
            <Tab onClick={(e) => {ipcRenderer.send('shrink'); ipcRenderer.send('close');}}>Exit</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div>Previous RNG: {prevAction} </div>
              <div className="action">{action}</div>
              { rolling ? 
              <Button colorScheme='yellow' isLoading loadingText='Rolling...'></Button> : 
              <Button width="100px" leftIcon={<BsDice6/>} colorScheme='yellow' onClick={(e) => {
                if (!rolling) {
                  Roll();
                }}}>Roll!</Button>
              }
              <div className="turn">
                <span>
                  <Button width="5px" leftIcon={<FaLevelUpAlt/>} colorScheme='yellow' onClick={(e) => {
                      ChangeTurn(turn + 1);
                    }}/>
                </span>
                &nbsp; Turn: {turn} &nbsp; 
                <span>
                  <Button width="5px" leftIcon={<FaLevelDownAlt/>} colorScheme='yellow' onClick={(e) => {
                      ChangeTurn(turn - 1);
                  }}/>
                </span>
              </div>

            </TabPanel>
            <TabPanel>
              <div className="setting">
                <Button colorScheme='yellow' onClick={(e) => {
                  Reset();
                  }}>
                    Reset Rolls
                </Button>
              </div>
              <div>Changing any settings will reset the roll</div>
              <h1 className="header">
                Free Will Settings
              </h1>
              <Divider/>
              <div className="setting">
                <div>
                  <Checkbox onChange={(e) => {
                    setFree(e.target.checked);
                    Reset();
                    }}>
                    <Tooltip hasArrow placement='top' label='Disable RNG for one round'>
                      Enable Free Will
                    </Tooltip>
                  </Checkbox>
                </div>
                {free ?
                <div>
                  <br/>
                  <Tooltip hasArrow placement='top' label='After ___ turn(s) there will be a round without RNG'>
                    Frequency
                  </Tooltip>
                  <NumberInput size='md' defaultValue={1} min={1} onChange={(valueString) => {
                    setFreefreq(parseInt(valueString));
                    Reset();
                    }}>
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <br/>
                  <Checkbox onChange={(e) => {
                    setFreeR1(e.target.checked);
                    Reset();
                  }}>
                    <Tooltip hasArrow placement='top' label='Start with Free Will round 1'>
                      Free Will Start
                    </Tooltip>
                  </Checkbox>
                </div> : null}
              </div>
              <h1 className="header">
                RNG Settings
              </h1>
              <Divider/>
              <div className="setting">
                <div>
                  <Checkbox onChange={(e) => {
                    setFreeze(e.target.checked);
                    Reset();
                    }}>
                    <Tooltip hasArrow placement='top' label='Enable Freezing During RNG'>
                      Freeze Mode
                    </Tooltip>
                  </Checkbox>
                </div>
                <div>
                  <Checkbox onChange={(e) => {
                    setUnique(e.target.checked);
                    Reset();
                    }}>
                    <Tooltip hasArrow placement='top' label='No Two Same Rolls Back-to-back'>
                      Unique Rolls
                    </Tooltip>
                  </Checkbox>
                </div>
                <Credits/>
              </div>
            </TabPanel>
            <TabPanel>
              <Help/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </ChakraProvider>
  );
}

export default App;
