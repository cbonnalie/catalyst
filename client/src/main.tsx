import './index.css'
import App from './App.tsx'
import ReactDOM from 'react-dom/client'
import {BrowserRouter} from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
    <BrowserRouter>
        <App/>
    </BrowserRouter>
)