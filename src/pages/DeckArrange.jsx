import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"
import { generateBotDeck } from "../game/botAI"

function DeckArrange() {
  const navigate = useNavigate()
  const { playerDeck, setPlayerDeck, selectedUniverse, setBotDeck } = useContext(GameContext)
  useEffect(() => {
    if (!selectedUniverse || playerDeck.length === 0) {
        navigate("/")
    }
  }, [selectedUniverse, playerDeck, navigate])

  const moveUp = (index) => {
    if (index === 0) return
    const newDeck = [...playerDeck]
    ;[newDeck[index - 1], newDeck[index]] = [newDeck[index], newDeck[index - 1]]
    setPlayerDeck(newDeck)
  }

  const moveDown = (index) => {
    if (index === playerDeck.length - 1) return
    const newDeck = [...playerDeck]
    ;[newDeck[index + 1], newDeck[index]] = [newDeck[index], newDeck[index + 1]]
    setPlayerDeck(newDeck)
  }

  const startBattle = () => {
    const bot = generateBotDeck(selectedUniverse.cards)
    setBotDeck(bot)
    navigate("/battle")
  }

  return (
    <div style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px"
    }}>
      <h2>Arrange Your Deck</h2>

      {playerDeck.map((card, index) => (
        <div
            key={card.id}
            className={`card ${card.rarity}`}
            style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px"
            }}
        >
            <div>
            <strong>{index + 1}. {card.name}</strong>
            <p>ATK {card.attack}</p>
            </div>

            <div>
            <button onClick={() => moveUp(index)}>↑</button>
            <button onClick={() => moveDown(index)}>↓</button>
            </div>
        </div>
      ))}

      <button onClick={startBattle} style={{ marginTop: "20px" }}>
        Start Battle
      </button>
    </div>
  )
}

export default DeckArrange