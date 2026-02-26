import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"
import { generateBotDeck } from "../game/botAI"

function DeckArrange() {
  const navigate = useNavigate()
  const { playerDeck, selectedUniverse, setBotDeck } = useContext(GameContext)

  const startBattle = () => {
    const bot = generateBotDeck(selectedUniverse.cards)
    setBotDeck(bot)
    navigate("/battle")
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Your Deck</h2>

      {playerDeck.map(card => (
        <div key={card.id}>
          {card.name} (ATK {card.attack} / HP {card.hp})
        </div>
      ))}

      <button onClick={startBattle} style={{ marginTop: "20px" }}>
        Start Battle
      </button>
    </div>
  )
}

export default DeckArrange