import React from "react";
import Die from "./Die";
import "./Body.css";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export default function Body() {
  const [dice, setDice] = React.useState(allNewDice);
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won");
    }
  }, [dice]);

  function allNewDice() {
    const tenNum = [];
    for (let i = 0; i < 10; i++) {
      tenNum.push(generateNewDie());
    }
    return tenNum;
  }
  function generateNewDie() {
    return {
      value: Math.floor(Math.random() * 7),
      isHeld: false,
      id: nanoid(),
    };
  }
  function newgame() {
    setTenzies(false);
    setDice(allNewDice());
  }
  //superstar
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  function rollDice() {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }
  const d = new Date();

  return (
    <div className="container">
      {tenzies && <Confetti />}
      <h1 className="title">Tenzie</h1>
      <p className="text">
        Roll until all dice are the same.Click each dice to freeze it at its
        current value between rolls.
      </p>
      <div className="dices">
        {dice.map((num) => (
          <Die
            key={num.id}
            value={num.value}
            isHeld={num.isHeld}
            hold={() => holdDice(num.id)}
          />
        ))}
      </div>
      {tenzies ? (
        <button className="roll" onClick={newgame}>
          NewGame
        </button>
      ) : (
        <button className="roll" onClick={rollDice}>
          Roll
        </button>
      )}
      <p>Copyright {d.getFullYear()} Mohmaed Ouadjih Boudraa</p>
    </div>
  );
}
