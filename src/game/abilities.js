export const abilityPool = [
  {
    id: "lifesteal",
    name: "Life Steal",
    trigger: "onAttack",
    effect: (attacker, defender) => {
      const heal = Math.floor(attacker.attack * 0.3)
      attacker.hp += heal
    }
  },
  {
    id: "shield",
    name: "Shield",
    trigger: "onDefend",
    effect: (attacker, defender) => {
      defender.hp += 2
    }
  },
  {
    id: "berserk",
    name: "Berserk",
    trigger: "onLowHP",
    effect: (attacker) => {
      attacker.attack += 2
    }
  }
]