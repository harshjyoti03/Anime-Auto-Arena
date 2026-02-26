import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"

function Result() {
  const navigate = useNavigate()
  const { battleResult } = useContext(GameContext)

  return (
    <div style={{ padding: "40px" }}>
      <h2>{battleResult}</h2>
      <button onClick={() => navigate("/")}>
        Back to Home
      </button>
    </div>
  )
}

export default Result