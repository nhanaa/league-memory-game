import './App.css';
import {useEffect, useState} from 'react';
import Card from './components/Card';
import useSound from 'use-sound';

const cardImages = [
  {"src" : "/img/jinx.png", matched: false},
  {"src" : "/img/caitlyn.png", matched: false},
  {"src" : "/img/blitzcrank.png", matched: false},
  {"src" : "/img/kindred.png", matched: false},
  {"src" : "/img/taric.png", matched: false},
  {"src" : "/img/teemo.png", matched: false},
  {"src" : "/img/lulu.png", matched: false},
  {"src" : "/img/zoe.png", matched: false},
]

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [play] = useSound(process.env.PUBLIC_URL + "/audio/happy-journey.mp3");

  // shuffle cards
  const shuffleCards = () => {
    play();
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  }

  // handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // start the game automatically
  useEffect(() => {
    // shuffleCards();
  }, [])

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true};
            } else {
              return card;
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (
    <div>
      <h1>League of Legends Memory Match</h1>
      <button className="new-game" onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <Card 
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className="turns">Turns: {turns}</p>
    </div>
  );
}

export default App;
