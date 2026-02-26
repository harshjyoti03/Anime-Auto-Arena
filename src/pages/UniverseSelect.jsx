import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"
import sampleUniverse from "../data/sampleUniverse"

function UniverseSelect() {
  const navigate = useNavigate()
  const { setSelectedUniverse } = useContext(GameContext)

  const handleSelect = () => {
    setSelectedUniverse(sampleUniverse)
    navigate("/cardpool")
  }

  return (
    <div style={containerStyle}>
      <h1>Select Universe</h1>

      <div
        className="universe-card"
        onClick={handleSelect}
      >
        <h2>Sample Arena</h2>
        <p>Basic Test Universe</p>
      </div>
    </div>
  )
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "40px",
  textAlign: "center"
}

export default UniverseSelect