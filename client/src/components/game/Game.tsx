import {useGameLogic} from "../../hooks/useGameLogic";
import "../../styles/Game.css";
import {GameOverPhase} from "./GameOverPhase.tsx";
import {GameLayout} from "./GameLayout.tsx";
import {ActiveGamePhase} from "./ActiveGamePhase.tsx";
import {JSX} from "react";

const Game: () => JSX.Element = (): JSX.Element => {
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
    } = useGameLogic();

    if (loading) return <div className={"loading"}>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (events.length === 0) return <div>No events found.</div>;

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
                    handleSubmit={handleSubmit}
                    setInvestmentAmount={setInvestmentAmount}
                    setSelectedInterval={setSelectedInterval}
                    setSelectedType={setSelectedType}
                    balanceHistory={balanceHistory}
                    completedUserInvestments={completedUserInvestments}
                    liveUserInvestments={liveUserInvestments}
                    userBalance={userBalance}
                    finalizedGame={finalizedGame}
                    currentYear={currentYear}
                    currentQuarter={currentQuarter}
                />
            )}
        </GameLayout>
    );
};

export default Game;
