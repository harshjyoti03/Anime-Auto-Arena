import { useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"

function CardPool() {
  const navigate = useNavigate()
  const { selectedUniverse, setPlayerDeck } = useContext(GameContext)
  
  useEffect(() => {
    if (!selectedUniverse) {
        navigate("/")
    }
  }, [selectedUniverse, navigate])

  const [selectedCards, setSelectedCards] = useState([])

  const toggleCard = (card) => {
    if (selectedCards.some(c => c.id === card.id)) {
      setSelectedCards(selectedCards.filter(c => c.id !== card.id))
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
    <>
        <div style={containerStyle}>
        <h2>Select 5 Cards ({selectedCards.length}/5)</h2>

        <div style={gridStyle}>
            {selectedUniverse.cards.map(card => (
            <div
                key={card.id}
                onClick={() => toggleCard(card)}
                className={`card ${card.rarity}
                ${selectedCards.some(c => c.id === card.id) ? "selected" : ""}
                ${selectedCards.length === 5 && !selectedCards.some(c => c.id === card.id) ? "unselected-dim" : ""}
                `}
            >
                {selectedCards.some(c => c.id === card.id) && (
                <div className="selected-badge">✓</div>
                )}

                <strong>{card.name}</strong>
                <p>ATK: {card.attack}</p>
                <p>HP: {card.hp}</p>
            </div>
            ))}
        </div>

        <button
            onClick={proceed}
            disabled={selectedCards.length !== 5}
            style={{
            marginTop: "40px",
            padding: "14px 28px",
            fontSize: "16px",
            background: selectedCards.length === 5
                ? "linear-gradient(90deg, #3b82f6, #a855f7)"
                : "#444",
            color: "white",
            borderRadius: "10px"
            }}
        >
            Proceed to Arrange
        </button>
        </div>

        {/* 🔥 Selected Deck Preview Bar */}
        <div style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        right: "0",
        background: "#111122",
        padding: "15px 20px",
        borderTop: "2px solid #3b82f6",
        display: "flex",
        justifyContent: "center",
        gap: "15px",
        zIndex: 100
        }}>
        {selectedCards.map(card => (
            <div
            key={card.id}
            className={`card ${card.rarity}`}
            style={{
                minWidth: "120px",
                transform: "scale(0.85)"
            }}
            >
            <strong>{card.name}</strong>
            </div>
        ))}
        </div>
    </>
  )
}

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "40px",
  paddingBottom: "120px"
}

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
  gap: "25px",
  marginTop: "30px"
}

export default CardPool