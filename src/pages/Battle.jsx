import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"
import { runBattle } from "../game/battleEngine"

function Battle() {
  const navigate = useNavigate()
  const {
    playerDeck,
    botDeck,
    setBattleResult
  } = useContext(GameContext)

  useEffect(() => {
    const result = runBattle(playerDeck, botDeck)
    setBattleResult(result)

    setTimeout(() => {
      navigate("/result")
    }, 1500)
  }, [])

  return (
    <div style={{ padding: "40px" }}>
      <h2>Battle Running...</h2>
    </div>
  )
}

export default Battle