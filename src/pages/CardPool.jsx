import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"

function CardPool() {
  const navigate = useNavigate()
  const { selectedUniverse, setPlayerDeck } = useContext(GameContext)

  const [selectedCards, setSelectedCards] = useState([])

  if (!selectedUniverse) return <p>No universe selected</p>

  const toggleCard = (card) => {
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card))
    } else {
      if (selectedCards.length < 5) {
        setSelectedCards([...selectedCards, card])
      }
    }
  }

  const proceed = () => {
    if (selectedCards.length === 5) {
      setPlayerDeck(selectedCards)
      navigate("/arrange")
    }
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Select 5 Cards ({selectedCards.length}/5)</h2>

      <div style={gridStyle}>
        {selectedUniverse.cards.map(card => (
          <div
            key={card.id}
            onClick={() => toggleCard(card)}
            style={{
              ...cardStyle,
              backgroundColor: selectedCards.includes(card)
                ? "#2a2a4f"
                : "#1a1a2e"
            }}
          >
            <h4>{card.name}</h4>
            <p>ATK: {card.attack}</p>
            <p>HP: {card.hp}</p>
          </div>
        ))}
      </div>

      <button
        onClick={proceed}
        disabled={selectedCards.length !== 5}
        style={{ marginTop: "20px" }}
      >
        Proceed
      </button>
    </div>
  )
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
  gap: "15px"
}

const cardStyle = {
  padding: "15px",
  borderRadius: "10px",
  cursor: "pointer"
}

export default CardPool