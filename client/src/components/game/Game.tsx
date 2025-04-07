import React, { useState } from "react";
import "../../styles/Game.css";
import { GameLayout } from "./GameLayout";
import { ActiveGamePhase } from "./ActiveGamePhase";
import { GameOverPhase } from "./GameOverPhase";
import { useGameEngine } from "../../hooks/useGameEngine";
import LoadingScreen from "../common/LoadingScreen";
import ErrorDisplay from "../common/ErrorDisplay";

/**
 * Main Game component that manages the overall game flow
 */
const Game: React.FC = () => {
    // Used to force a re-fetch when retry is clicked
    const [retryCounter, setRetryCounter] = useState<number>(0);

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
    } = useGameEngine(retryCounter);

    // Handler for retry button
    const handleRetry = () => {
        setRetryCounter(prev => prev + 1);
    };

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