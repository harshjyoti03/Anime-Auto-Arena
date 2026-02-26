export function runBattle(playerDeck, botDeck) {
  let playerIndex = 0
  let botIndex = 0

  let playerCard = { ...playerDeck[playerIndex], maxHp: playerDeck[playerIndex].hp }
  let botCard = { ...botDeck[botIndex], maxHp: botDeck[botIndex].hp }

  const log = []
  const combatLog = []

  function processAbility(card, trigger, opponent) {
    if (card.ability?.trigger === trigger) {
      card.ability.effect(card, opponent)
      combatLog.push(`${card.name} activated ${card.ability.name}`)
    }
  }
  
  while (playerIndex < 5 && botIndex < 5) {
    log.push({
      playerCard: { ...playerCard },
      botCard: { ...botCard }
    })

    // Player attacks
    processAbility(playerCard, "onAttack", botCard)

    botCard.hp -= playerCard.attack
    
    if (botCard.hp <= 0) {
      botIndex++
      if (botIndex >= 5) break
      botCard = { ...botDeck[botIndex], maxHp: botDeck[botIndex].hp }
      continue
    }

    // Bot attacks
    processAbility(botCard, "onAttack", playerCard)

    playerCard.hp -= botCard.attack

    if (playerCard.hp <= 0) {
      playerIndex++
      if (playerIndex >= 5) break
      playerCard = { ...playerDeck[playerIndex], maxHp: playerDeck[playerIndex].hp }
    }

    // low hp checks
    if (playerCard.hp <= playerCard.maxHp / 2) {
        processAbility(playerCard, "onLowHP", botCard)
    }

    if (botCard.hp <= botCard.maxHp / 2) {
        processAbility(botCard, "onLowHP", playerCard)
    }
  }

  const winner = playerIndex >= 5 ? "Bot Wins" : "Player Wins"

  return { log, winner, combatLog }
}