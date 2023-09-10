import React from 'react';
import './App.css';
import Die from "./Die.jsx";
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dieArray,setDieArray]=React.useState(rollDice());
  const [tenzies,setTenzies]=React.useState(false);
  const [score,setScore]=React.useState(0);

  React.useEffect(()=>{
    let firstNum=dieArray[0].value;
    let isAllHeld=dieArray.every((die)=>{return die.isHeld===true});
    let allSameNumber=dieArray.every((die)=>{return die.value===firstNum});
    if(isAllHeld && allSameNumber){
      setTenzies(true);
    }
  },[dieArray])

  function generateRandomNumber(){
    return Math.ceil(Math.random() * 6);
  }

  function rollDice(){
    let newDiceArray=[];
    for(let i=0;i<10;++i){
      const die={
        value: generateRandomNumber(),
        isHeld: false,
        id: nanoid()
      }
      newDiceArray.push(die);
    }
    return newDiceArray;
  }

  function handleHeld(id){
    setDieArray((prevDie)=>{
      return prevDie.map((die)=>{
        return die.id===id?{...die,isHeld: !die.isHeld} : die;
      })
    })
  }

  function handleRoll(){
    setScore((prevScore)=>{
      return prevScore+1;
    })
    if(!tenzies){
      setDieArray((prevDie)=>{
        return prevDie.map((die)=>{
          return die.isHeld? die : {...die,value: generateRandomNumber()};
        })
      });
    }else{
      setDieArray(rollDice());
      setTenzies(false);
    }
    
  }

  const bgButton={backgroundColor : tenzies ? '#3AA6B9' : '#213555'};

  return (
    <main>
      {tenzies && <Confetti />}
      <div className='heading'>
        <h1>Tenzies</h1>
      </div>
      <div className='desc'>
        <p>Tenzi dice game is a super fun and stimulating dice game that can be played with almost any group of people. Roll the Die and click to hold the die untill all the ten die show same number.</p>
      </div>
      <div className='base-setup'>
        {dieArray.map((die)=>{
          return (<Die key={die.id} id={die.id} isHeld={die.isHeld} value={die.value} handleHeld={handleHeld}/>)
        })}
      </div>
      {tenzies && <h1 className='result'>{`Your Score is ${score}` }</h1>}
      <button className='roll-btn' onClick={handleRoll} style={bgButton}>{tenzies ? "New Game" : "Roll"}</button>
    </main>
    
  );
}

export default App;
