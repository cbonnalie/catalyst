import React, { useState } from 'react';
import '../../styles/GameSetup.css';
import { GAME_CONSTANTS } from '../../@types/types';

interface GameSetupProps {
    onStartGame: (rounds: number) => void;
}

/**
 * Game setup component that allows users to select number of rounds before playing
 */
const GameSetup: React.FC<GameSetupProps> = ({ onStartGame }) => {
    const [rounds, setRounds] = useState<number>(5);
    const [startingBalance, setStartingBalance] = useState<number>(GAME_CONSTANTS.STARTING_BALANCE);

    // Options for number of rounds
    const roundOptions = [3, 5, 10, 20];
    // const balanceOptions = [1000, 10000, 20000, 50000];

    const handleRoundChange = (value: number) => {
        setRounds(value);
    };

    // const handleBalanceChange = (value: number) => {
    //     setStartingBalance(value);
    // };

    const handleStartGame = () => {
        onStartGame(rounds);
    };

    return (
        <div className="game-setup-container">
            <div className="setup-card">

                <div className="setup-section">
                    <h2 className="section-title">Game Rounds</h2>
                    <p className="section-description">
                        Each round represents a new investment opportunity.
                    </p>

                    <div className="rounds-options">
                        {roundOptions.map(option => (
                            <button
                                key={option}
                                className={`round-option ${rounds === option ? 'selected' : ''}`}
                                onClick={() => handleRoundChange(option)}
                            >
                                {option} Rounds
                            </button>
                        ))}
                    </div>
                </div>

                <div className="setup-section">
                    <h2 className="section-title">Starting Balance</h2>
                    <div className="balance-display">
                        ${startingBalance.toLocaleString()}
                    </div>
                </div>

                <button className="start-game-button" onClick={handleStartGame}>
                    Start Game
                </button>
            </div>
        </div>
    );
};

export default GameSetup;