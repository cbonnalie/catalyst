// components/game/Game.tsx
import React, { useState } from "react";
import "../../styles/Game.css";
import { GameLayout } from "./GameLayout";
import { ActiveGamePhase } from "./ActiveGamePhase";
import { GameOverPhase } from "./GameOverPhase";
import { useGameEngine } from "../../hooks/useGameEngine";
import LoadingScreen from "../common/LoadingScreen";
import ErrorDisplay from "../common/ErrorDisplay";
import GameSetup from "./GameSetup";

/**
 * Main Game component that manages the overall game flow
 */
const Game: React.FC = () => {
    // Game setup state
    const [gameStarted, setGameStarted] = useState<boolean>(false);
    const [roundsToPlay, setRoundsToPlay] = useState<number>(5);

    // Used to force a re-fetch when retry is clicked
    const [retryCounter, setRetryCounter] = useState<number>(0);

    // Always call the game engine hook (to maintain hook order)
    // but only start loading when gameStarted is true
    const {
        events,
        loading,
        error,
        userBalance,
        balanceHistory,
        completedUserInvestments,
        liveUserInvestments,
        investmentAmount,
        selectedInterval,
        selectedType,
        currentYear,
        currentQuarter,
        finalizedGame,
        currentEvent,
        handleSubmit,
        setInvestmentAmount,
        setSelectedInterval,
        setSelectedType,
        finalizeGame,
        isGameOver,
        startGame
    } = useGameEngine(retryCounter, roundsToPlay);

    // Handler for retry button
    const handleRetry = () => {
        setRetryCounter(prev => prev + 1);
    };

    // Handler for starting the game
    const handleStartGame = (rounds: number) => {
        setRoundsToPlay(rounds);
        setGameStarted(true);
        // Call the startGame function from the hook
        startGame(rounds);
    };

    // If game hasn't started yet, show the setup screen
    if (!gameStarted) {
        return (
            <GameLayout>
                <GameSetup onStartGame={handleStartGame} />
            </GameLayout>
        );
    }

    // Show loading state
    if (loading) {
        return <LoadingScreen />;
    }

    // Show error state
    if (error) {
        return <ErrorDisplay message={error} onRetry={handleRetry} />;
    }

    // Check if we have events
    if (events.length === 0) {
        return <ErrorDisplay
            message="No events found. Please try again or check your connection."
            onRetry={handleRetry}
        />;
    }

    return (
        <GameLayout>
            {isGameOver ? (
                <GameOverPhase
                    userBalance={userBalance}
                    completedUserInvestments={completedUserInvestments}
                    liveUserInvestments={liveUserInvestments}
                    finalizeGame={finalizeGame}
                    finalizedGame={finalizedGame}
                    balanceHistory={balanceHistory}
                />
            ) : (
                <ActiveGamePhase
                    currentEvent={currentEvent}
                    investmentAmount={investmentAmount}
                    selectedInterval={selectedInterval}
                    selectedType={selectedType}
                    userBalance={userBalance}
                    handleSubmit={handleSubmit}
                    setInvestmentAmount={setInvestmentAmount}
                    setSelectedInterval={setSelectedInterval}
                    setSelectedType={setSelectedType}
                    balanceHistory={balanceHistory}
                    completedUserInvestments={completedUserInvestments}
                    liveUserInvestments={liveUserInvestments}
                    finalizedGame={finalizedGame}
                    currentYear={currentYear}
                    currentQuarter={currentQuarter}
                />
            )}
        </GameLayout>
    );
};

export default Game;