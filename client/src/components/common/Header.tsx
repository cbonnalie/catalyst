import {useState} from 'react'

const Header = () => {

    const [menuOpen, setMenuOpen] = useState(false)

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen)
    }

    return (
        <div>
            <div
                className={`site-name-header ${menuOpen ? 'open' : ''}`}
                onMouseEnter={handleMenuToggle}
            >
                CATALYST
            </div>

            <div
                className={`panel ${menuOpen ? 'open' : ''}`}
                onMouseLeave={handleMenuToggle}
            >
                <ul>
                    <li>
                        <a href="/public">Home</a>
                    </li>
                    <li>
                        <a href="/about">About</a>
                    </li>
                    <li>
                        <a href="/play">Play</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Header
