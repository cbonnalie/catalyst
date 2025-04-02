import {useGameLogic} from "../../hooks/useGameLogic";
import EventCard from "../common/EventCard";
import InvestmentResults from "../game/InvestmentResults";
import EndGameSummary from "./EndGameSummary";
import {renderLineChart} from "./LineChart";
import "../../styles/Game.css";

const Game = () => {
    const {
        events,
        loading,
        error,
        userBalance,
        balanceHistory,
        completedUserInvestments,
        recentlyCompletedInvestments,
        liveUserInvestments,
        investmentAmount,
        selectedInterval,
        currentYear,
        currentQuarter,
        finalizedGame,
        currentEvent,
        handleSubmit,
        setInvestmentAmount,
        setSelectedInterval,
        finalizeGame,
        isGameOver,
    } = useGameLogic();

    if (loading) return <div className={"loading"}>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (events.length === 0) return <div>No events found.</div>;

    return (
        <div className={"game-container"}>
            {isGameOver ? (
                <div className="end-game-summary">
                    <EndGameSummary
                        balance={userBalance}
                        completedInvestments={completedUserInvestments}
                        liveInvestments={liveUserInvestments}
                        finalizeGame={finalizeGame}
                        finalizedGame={finalizedGame}
                    />
                </div>
            ) : (
                <div className="event-card-wrapper">
                    <EventCard
                        event={currentEvent}
                        investmentAmount={investmentAmount}
                        selectedInterval={selectedInterval}
                        onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                        onIntervalChange={(e) => setSelectedInterval(e.target.value as "3 months" | "6 months" | "1 year" | "5 years")}
                        onSubmit={handleSubmit}
                    />
                    <InvestmentResults choicesToProcess={recentlyCompletedInvestments}/>
                </div>
            )}
            <div className="balance-container">${userBalance.toFixed(2)}</div>

            <div className={"balance-chart-container"}>
                {renderLineChart(balanceHistory)}
            </div>

            <div className="date-tracker">
                {!finalizedGame && `Year ${currentYear} Quarter ${currentQuarter}`}
            </div>
        </div>
    );
};

export default Game;
