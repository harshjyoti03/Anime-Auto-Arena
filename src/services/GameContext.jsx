import { createContext, useState, useEffect } from "react"
import universes from "../data/universes"
import { abilityPool } from "../game/abilities"

export const GameContext = createContext()

export function GameProvider({ children }) {

  const [selectedUniverseId, setSelectedUniverseId] = useState(() => {
    return localStorage.getItem("selectedUniverseId") || null
  })

  const selectedUniverse =
    universes.find(u => u.id === selectedUniverseId) || null

  const [playerDeck, setPlayerDeck] = useState(() => {
    const saved = localStorage.getItem("playerDeck")

    if (!saved) return []

    const parsed = JSON.parse(saved)

    // Reconnect ability functions
    return parsed.map(card => {
        if (!card.ability) return card

        const realAbility = abilityPool.find(
        a => a.id === card.ability.id
        )

        return {
        ...card,
        ability: realAbility || null
        }
    })
  })

  const [botDeck, setBotDeck] = useState(() => {
    const saved = localStorage.getItem("botDeck")

    if (!saved) return []

    const parsed = JSON.parse(saved)

    return parsed.map(card => {
        if (!card.ability) return card

        const realAbility = abilityPool.find(
        a => a.id === card.ability.id
        )

        return {
        ...card,
        ability: realAbility || null
        }
    })
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