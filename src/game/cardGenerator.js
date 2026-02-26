
import { abilityPool } from "./abilities"

function seededRandom(seed) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function getRarity(seed) {
  const roll = seededRandom(seed) * 100

  if (roll < 60) return "common"
  if (roll < 90) return "rare"
  return "epic"
}

function generateStats(rarity, seed) {
  const baseAttack = Math.floor(seededRandom(seed + 1) * 6) + 5
  const baseHP = Math.floor(seededRandom(seed + 2) * 6) + 8

  if (rarity === "rare") {
    return { attack: baseAttack + 2, hp: baseHP + 2 }
  }

  if (rarity === "epic") {
    return { attack: baseAttack + 4, hp: baseHP + 4 }
  }

  return { attack: baseAttack, hp: baseHP }
}

function assignAbility(rarity, seed) {
  const chance = seededRandom(seed + 5)

  if (rarity === "epic" && chance > 0.3) {
    return abilityPool[Math.floor(chance * abilityPool.length)]
  }

  if (rarity === "rare" && chance > 0.6) {
    return abilityPool[Math.floor(chance * abilityPool.length)]
  }

  return null
}

export function generateCard(name, id, universeSeed = 1) {
  const combinedSeed = id * universeSeed
  const rarity = getRarity(combinedSeed)
  const stats = generateStats(rarity, combinedSeed)

  const ability = assignAbility(rarity, combinedSeed)

  return {
    id,
    name,
    rarity,
    ability,
    ...stats
  }
}