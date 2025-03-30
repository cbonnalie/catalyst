import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Game from './components/game/Game.tsx'

const App = () => {


    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/play" element={<Game />} />
        </Routes>
    )
}

export default App;