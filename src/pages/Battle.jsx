import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"
import { runBattle } from "../game/battleEngine"

function Battle() {
  const { playerDeck, botDeck } = useContext(GameContext)
  const navigate = useNavigate()

  const [battleLog, setBattleLog] = useState([])
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState(null)

  const handleBackHome = () => {
    navigate("/")
    window.location.reload()
  }

  useEffect(() => {
    const battleData = runBattle(playerDeck, botDeck)
    setBattleLog(battleData.log)
    setResult(battleData.winner)
  }, [])

  useEffect(() => {
    if (currentStep < battleLog.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1)
      }, 800)
      return () => clearTimeout(timer)
    }
  }, [currentStep, battleLog])

  if (battleLog.length === 0) return <p>Loading Battle...</p>

  const currentFight = battleLog[currentStep]

  return (
    <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "40px",
        textAlign: "center"
    }}>
      <h2>⚔️ Battle Arena</h2>

      {/* Player Deck */}
      <h3>Player Deck</h3>
      <div style={rowStyle}>
        {playerDeck.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* Current Fight */}
      <h3>Current Fight</h3>
      <div style={fightStyle}>
        <Card 
            card={currentFight.playerCard} 
            highlight 
            damaged={currentStep % 2 === 1}
        />

        <span style={{
            fontSize: "40px",
            fontWeight: "800",
            textShadow: "0 0 12px #fff"
        }}>
            VS
        </span>

        <Card 
            card={currentFight.botCard} 
            highlight 
            damaged={currentStep % 2 === 0}
        />
      </div>

      <hr style={{ margin: "20px 0" }} />

      {/* Bot Deck */}
      <h3>Bot Deck</h3>
      <div style={rowStyle}>
        {botDeck.map(card => (
          <Card key={card.id} card={card} />
        ))}
      </div>

      {/* Result */}
      {currentStep === battleLog.length - 1 && (
        <div style={{ marginTop: "30px", textAlign: "center" }}>
            <h2>{result}</h2>

            <button
                style={{
                    marginTop: "15px",
                    padding: "10px 20px",
                    backgroundColor: "#4CAF50",
                    color: "white"
                }}
                onClick={() => handleBackHome()}
            >
                Back to Home
            </button>
        </div>
      )}
    </div>
  )
}

function Card({ card, highlight, damaged }) {
  const hpPercent = (card.hp / card.maxHp) * 100

  return (
    <div
      className={`card ${card.rarity} 
        ${highlight ? "attack-animate" : ""}
        ${damaged ? "damage-shake hit-flash" : ""}
      `}
    >
      <strong>{card.name}</strong>
      <p>ATK: {card.attack}</p>

      <div className="hp-bar">
        <div
          className="hp-fill"
          style={{ width: `${hpPercent}%` }}
        />
      </div>

      <small>{card.hp} HP</small>
    </div>
  )
}

const rowStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "25px",
  flexWrap: "wrap",
  marginTop: "20px"
}

const fightStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "60px",
  margin: "30px 0"
}

const cardStyle = {
  backgroundColor: "#1a1a2e",
  padding: "10px",
  borderRadius: "8px",
  minWidth: "120px"
}

export default Battle