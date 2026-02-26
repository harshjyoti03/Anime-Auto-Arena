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
    <div style={{ padding: "40px" }}>
      <h2>Select Universe</h2>
      <button onClick={handleSelect}>
        Sample Arena
      </button>
    </div>
  )
}

export default UniverseSelect