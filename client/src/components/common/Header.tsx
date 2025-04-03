import React from 'react';
import '../../styles/Header.css';

const LOGO = "client/src/assets/logo.png";

export const Header: React.FC = () => {
    return (
        <header className="header">
            <img src={LOGO} alt="Logo" className="logo" />
            <nav className="nav">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/play">Play</a></li>
                </ul>
            </nav>
        </header>
    );
}
