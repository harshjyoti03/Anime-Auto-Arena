import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { GameContext } from "../services/GameContext"
import universes from "../data/universes"

function UniverseSelect() {
  const navigate = useNavigate()
  const { setSelectedUniverse } = useContext(GameContext)

  const handleSelect = (universe) => {
    setSelectedUniverse(universe)
    navigate("/cardpool")
  }

  return (
    <div style={containerStyle}>
      <h1>Select Universe</h1>

      <div style={gridStyle}>
        {universes.map((universe) => (
          <div
            key={universe.id}
            className="universe-card"
            onClick={() => handleSelect(universe)}
          >
            <h2>{universe.name}</h2>
            <p>{universe.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

const containerStyle = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "40px",
  textAlign: "center"
}

const gridStyle = {
  display: "flex",
  gap: "30px",
  flexWrap: "wrap",
  justifyContent: "center"
}

export default UniverseSelect