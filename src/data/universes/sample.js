import { generateCard } from "../../game/cardGenerator"

const names = [
  "Blaze Ninja",
  "Shadow Samurai",
  "Thunder Monk",
  "Iron Guardian",
  "Wind Assassin",
  "Flame Beast",
  "Crystal Mage",
  "Void Knight",
  "Storm Archer",
  "Dark Brawler"
]

const universeSeed = 42

const sampleUniverse = {
  id: "sample",
  name: "Sample Arena",
  description: "Procedural Test Universe",
  mechanic: {
    id: "rageOverflow",
    name: "Rage Overflow",
    description: "All cards gain +1 ATK every round."
  },
  cards: names.map((name, index) =>
    generateCard(name, index + 1, universeSeed)
  )
}

export default sampleUniverse