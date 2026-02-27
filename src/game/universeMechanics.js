// ==========================
// UNIVERSE MECHANICS SYSTEM
// ==========================

export function applyUniverseMechanic(mechanicId, playerCard, botCard, round, combatLog) {
  if (!mechanicId) return

  switch (mechanicId) {

    case "rageOverflow":
      playerCard.attack += 1
      botCard.attack += 1
      combatLog.push("⚡ Rage Overflow: All cards gain +1 ATK")
      break

    case "healingMist":
      playerCard.hp += 1
      botCard.hp += 1
      combatLog.push("🌿 Healing Mist: All cards heal +1 HP")
      break

    case "suddenDeath":
      if (round > 5) {
        playerCard.attack += 2
        botCard.attack += 2
        combatLog.push("🔥 Sudden Death: +2 ATK after Round 5")
      }
      break

    default:
      break
  }
}