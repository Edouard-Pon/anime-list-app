import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Anime from './pages/Anime'
import AnimeDetail from './pages/AnimeDetail'
import Characters from './pages/Characters'
import CharacterDetail from './pages/CharacterDetail'
import NotFound from './pages/NotFound'
import About from './pages/About.jsx'
import Navigation from './components/Navigation.jsx'
import Profile from './pages/Profile';


function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/anime/:id" element={<AnimeDetail />} />
        <Route path="/characters" element={<Characters />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  )
}

export default App
