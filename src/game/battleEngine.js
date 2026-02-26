export function runBattle(playerDeck, botDeck) {
  let playerIndex = 0
  let botIndex = 0

  let playerCard = { ...playerDeck[playerIndex], maxHp: playerDeck[playerIndex].hp }
  let botCard = { ...botDeck[botIndex], maxHp: botDeck[botIndex].hp }

  const log = []

  while (playerIndex < 5 && botIndex < 5) {
    log.push({
      playerCard: { ...playerCard },
      botCard: { ...botCard }
    })

    // Ability: onAttack
    if (playerCard.ability?.trigger === "onAttack") {
        playerCard.ability.effect(playerCard, botCard)
    }
    // Player attacks
    botCard.hp -= playerCard.attack
    if (botCard.hp <= 0) {
      botIndex++
      if (botIndex >= 5) break
      botCard = { ...botDeck[botIndex], maxHp: botDeck[botIndex].hp }
      continue
    }

    if (botCard.ability?.trigger === "onAttack") {
        botCard.ability.effect(botCard, playerCard)
    }
    // Bot attacks
    playerCard.hp -= botCard.attack
    if (playerCard.hp <= 0) {
      playerIndex++
      if (playerIndex >= 5) break
      playerCard = { ...playerDeck[playerIndex], maxHp: playerDeck[playerIndex].hp }
    }

    if (playerCard.ability?.trigger === "onLowHP" && playerCard.hp <= playerCard.maxHp / 2) {
        playerCard.ability.effect(playerCard)
    }

    if (botCard.ability?.trigger === "onLowHP" && botCard.hp <= botCard.maxHp / 2) {
        botCard.ability.effect(botCard)
    }
  }

  const winner = playerIndex >= 5 ? "Bot Wins" : "Player Wins"

  return { log, winner }
}