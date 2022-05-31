import { setGlobal, addCallback } from "reactn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import Navbar from "./components/Navbar";

function App() {
  const rehydrateState = () => {
    const state = localStorage.getItem('globalState')
    if (state) return JSON.parse(state)

    return {
      token: null,
      user: null
    }
  }

  setGlobal(rehydrateState)

  addCallback(state => {
    localStorage.setItem('globalState', JSON.stringify(state))
  })

  return (
    <Router>
      <Navbar />
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/game" element={<GamePage />} />
      <Route path="*" />
    </Routes>
  </Router>
  )
}

export default App;