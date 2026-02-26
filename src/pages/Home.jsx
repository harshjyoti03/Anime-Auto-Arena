import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div style={styles.container}>
      <h1>🎴 Anime Auto Arena</h1>
      <button onClick={() => navigate("/universe")}>
        Start Game
      </button>
    </div>
  )
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px"
  }
}

export default Home