import { createContext, useState, useEffect } from "react"

export const GameContext = createContext()

export function GameProvider({ children }) {

  const [selectedUniverse, setSelectedUniverse] = useState(() => {
    const saved = localStorage.getItem("selectedUniverse")
    return saved ? JSON.parse(saved) : null
  })

  const [playerDeck, setPlayerDeck] = useState(() => {
    const saved = localStorage.getItem("playerDeck")
    return saved ? JSON.parse(saved) : []
  })

  const [botDeck, setBotDeck] = useState(() => {
    const saved = localStorage.getItem("botDeck")
    return saved ? JSON.parse(saved) : []
  })

  const [battleResult, setBattleResult] = useState(null)

  // Persist selectedUniverse
  useEffect(() => {
    if (selectedUniverse) {
      localStorage.setItem("selectedUniverse", JSON.stringify(selectedUniverse))
    }
  }, [selectedUniverse])

  // Persist playerDeck
  useEffect(() => {
    localStorage.setItem("playerDeck", JSON.stringify(playerDeck))
  }, [playerDeck])

  // Persist botDeck
  useEffect(() => {
    localStorage.setItem("botDeck", JSON.stringify(botDeck))
  }, [botDeck])

  return (
    <GameContext.Provider
      value={{
        selectedUniverse,
        setSelectedUniverse,
        playerDeck,
        setPlayerDeck,
        botDeck,
        setBotDeck,
        battleResult,
        setBattleResult
      }}
    >
      {children}
    </GameContext.Provider>
  )
}