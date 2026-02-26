import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import UniverseSelect from "./pages/UniverseSelect"
import CardPool from "./pages/CardPool"
import DeckArrange from "./pages/DeckArrange"
import Battle from "./pages/Battle"
import Result from "./pages/Result"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/universe" element={<UniverseSelect />} />
      <Route path="/cardpool" element={<CardPool />} />
      <Route path="/arrange" element={<DeckArrange />} />
      <Route path="/battle" element={<Battle />} />
      <Route path="/result" element={<Result />} />
    </Routes>
  )
}

export default App