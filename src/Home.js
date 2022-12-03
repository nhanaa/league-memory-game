import './Home.css';
import {useEffect, useState} from 'react';
import Card from './components/Card';
// import useSound from 'use-sound';

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

const Home = ({playBGM, stopBGM, musicActive}) => {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [matches, setMatches] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // const [play, {stop}] = useSound(process.env.PUBLIC_URL + "/audio/happy-journey.mp3");

  // Shuffle cards
  const shuffleCards = () => {
    stopBGM();
    if (musicActive) {
      playBGM();
    }
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setMatches(0);
  }

  // Handle a choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  }

  // Start the game automatically
  useEffect(() => {
    // shuffleCards();
    console.log(musicActive);
  }, [musicActive]);

  // Compare 2 selected cards
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
        });
        setMatches(prevMaches => prevMaches + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo])

  // Game finished. Check to update highest score.
  useEffect(() => {
    if (matches === 8) {
      if (highestScore === 0) {
        setHighestScore(turns);
        return;
      }
      if (turns < highestScore ) {
        setHighestScore(turns);
      }
    }
  }, [matches, highestScore, turns])

  // reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  return (  
    <div className="home">
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
      <div className="stats">
        <span className="turns">Turns: {turns}</span>
        <span className="highest-score">Highest Score: {highestScore}</span>
      </div>
    </div>
  );
}
 
export default Home;