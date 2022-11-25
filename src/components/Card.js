import './Card.css'
import useSound from 'use-sound';

const Cards = ({card, handleChoice, flipped, disabled}) => {
  const [play, {stop}] = useSound(process.env.PUBLIC_URL + "/audio/flip-card.mp3");

  const handleClick = () => {
    if (!disabled) {
      stop();
      play();
      handleChoice(card);
    }
  }

  return (  
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={process.env.PUBLIC_URL + card.src} alt="card front" />
        <img 
          className="back" 
          src={process.env.PUBLIC_URL + "/img/cover.png"} 
          onClick={handleClick} 
          alt="card back" />
      </div>
    </div>
  )
}
 
export default Cards;