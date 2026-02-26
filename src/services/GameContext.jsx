import { createContext, useState, useEffect } from "react"
import universes from "../data/universes"

export const GameContext = createContext()

export function GameProvider({ children }) {

  const [selectedUniverseId, setSelectedUniverseId] = useState(() => {
    return localStorage.getItem("selectedUniverseId") || null
  })

  const selectedUniverse =
    universes.find(u => u.id === selectedUniverseId) || null

  const [playerDeck, setPlayerDeck] = useState(() => {
    const saved = localStorage.getItem("playerDeck")
    return saved ? JSON.parse(saved) : []
  })

  const [botDeck, setBotDeck] = useState(() => {
    const saved = localStorage.getItem("botDeck")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (selectedUniverseId) {
      localStorage.setItem("selectedUniverseId", selectedUniverseId)
    }
  }, [selectedUniverseId])

  useEffect(() => {
    localStorage.setItem("playerDeck", JSON.stringify(playerDeck))
  }, [playerDeck])

  useEffect(() => {
    localStorage.setItem("botDeck", JSON.stringify(botDeck))
  }, [botDeck])

  return (
    <GameContext.Provider
      value={{
        selectedUniverse,
        setSelectedUniverseId,
        playerDeck,
        setPlayerDeck,
        botDeck,
        setBotDeck
      }}
    >
      {children}
    </GameContext.Provider>
  )
}