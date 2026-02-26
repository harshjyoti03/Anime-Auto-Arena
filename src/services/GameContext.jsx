import { createContext, useState } from "react"

export const GameContext = createContext()

export function GameProvider({ children }) {
  const [selectedUniverse, setSelectedUniverse] = useState(null)
  const [playerDeck, setPlayerDeck] = useState([])
  const [botDeck, setBotDeck] = useState([])
  const [battleResult, setBattleResult] = useState(null)

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