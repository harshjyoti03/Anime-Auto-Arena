export function runBattle(playerDeck, botDeck) {
  let playerIndex = 0
  let botIndex = 0

  let playerCard = { ...playerDeck[playerIndex] }
  let botCard = { ...botDeck[botIndex] }

  const log = []

  while (playerIndex < 5 && botIndex < 5) {
    log.push({
      playerCard: { ...playerCard },
      botCard: { ...botCard }
    })

    // Player attacks
    botCard.hp -= playerCard.attack
    if (botCard.hp <= 0) {
      botIndex++
      if (botIndex >= 5) break
      botCard = { ...botDeck[botIndex] }
      continue
    }

    // Bot attacks
    playerCard.hp -= botCard.attack
    if (playerCard.hp <= 0) {
      playerIndex++
      if (playerIndex >= 5) break
      playerCard = { ...playerDeck[playerIndex] }
    }
  }

  const winner = playerIndex >= 5 ? "Bot Wins" : "Player Wins"

  return { log, winner }
}