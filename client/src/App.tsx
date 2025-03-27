import {Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Play from './components/pages/Play'

const App = () => {


    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/play" element={<Play />} />
        </Routes>
    )
}

export default App;