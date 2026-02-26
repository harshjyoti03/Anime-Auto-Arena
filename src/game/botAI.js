export function generateBotDeck(cardPool) {
  const shuffled = [...cardPool].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 5)
}