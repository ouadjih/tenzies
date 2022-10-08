import React from 'react'
import Die from './Die'
import './Body.css'
import {nanoid} from 'nanoid'
export default function Body() {
    const[dice, setDice]= React.useState(allNewDice)

   function allNewDice(){
        const tenNum=[]
        for(let i=0 ; i<10 ;i++){
            tenNum.push(generateNewDie())
        }
        return tenNum   
    }
    function generateNewDie(){
        return {
            value: Math.floor(Math.random() * 7),
            isHeld:false,
            id:nanoid()
        }
    }
    //superstar
    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ?
                {...die, isHeld:!die.isHeld}:
                die
        }))

    }

    function rollDice(){
        setDice(oldDice=>oldDice.map(die => {
                return die.isHeld?
                die :
                generateNewDie()
            }
         ))
    }

    
  return (
    <div className='container'>
        <h1 className='title'>Tenzie</h1>
        <p className='text'>Roll until all dice are the same.Click each dice to freeze it at its current value between rolls.</p>
        <div className="dices">
        { dice.map(num => 
             <Die 
                key={num.id} 
                value={num.value} 
                isHeld={num.isHeld} 
                hold={()=>holdDice(num.id)}/>
            )
        }
        </div> 
        <button className='roll' onClick={rollDice}>Roll</button>
    </div>
  )
}
