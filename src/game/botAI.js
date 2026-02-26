// BOT DECK GENERATOR
export function generateBotDeck(universeCards, playerDeck) {
  const availableCards = universeCards.filter(
    card => !playerDeck.some(pc => pc.id === card.id)
  )

  const shuffled = [...availableCards].sort(
    () => 0.5 - Math.random()
  )

  return shuffled.slice(0, 5)
}

// SMART CARD CHOICE DURING BATTLE
export function chooseNextBotCard(botDeck, playerCard) {
  if (botDeck.length === 0) return null

  // If player HP is low → go aggressive
  if (playerCard.hp <= playerCard.maxHp * 0.4) {
    return botDeck.reduce((best, card) =>
      card.attack > best.attack ? card : best
    )
  }

  // If bot HP is low → go tank
  const tank = botDeck.reduce((best, card) =>
    card.hp > best.hp ? card : best
  )

  if (tank.hp > playerCard.attack) {
    return tank
  }

  // Balanced choice
  return botDeck.reduce((best, card) =>
    card.attack + card.hp > best.attack + best.hp ? card : best
  )
}