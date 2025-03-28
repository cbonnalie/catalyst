import {Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Game from './components/pages/Game.tsx'

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