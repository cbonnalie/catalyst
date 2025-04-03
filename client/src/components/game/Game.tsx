import {useGameLogic} from "../../hooks/useGameLogic";
import EventCard from "../common/EventCard";
import EndGameSummary from "./EndGameSummary";
import {renderLineChart} from "./LineChart";
import {RenderInvestments} from "./RenderInvestments";
import "../../styles/Game.css";

const Game = () => {
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
                <>
                    <div className={"row1"}>
                        <div className="event-card-wrapper">
                            <EventCard
                                event={currentEvent}
                                investmentAmount={investmentAmount}
                                selectedInterval={selectedInterval}
                                onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                                onIntervalChange={(e) => setSelectedInterval(e.target.value as "3 months" | "6 months" | "1 year" | "5 years")}
                                onSubmit={handleSubmit}
                            />
                        </div>
                    </div>

                    <div className={"row2"}>
                        <div className={"info-container"}>
                            <div className={"balance-chart-wrapper"}>
                                {renderLineChart(balanceHistory)}
                            </div>
                            <div className={"investments-wrapper"}>
                                <RenderInvestments choicesToProcess={completedUserInvestments} areFinalized={true}/>
                            </div>
                            <div className={"investments-wrapper"}>
                                <RenderInvestments choicesToProcess={liveUserInvestments} areFinalized={false}/>
                            </div>
                        </div>
                    </div>

                    <div className={"row3"}>
                        <div className="balance-wrapper">${userBalance.toFixed(2)}</div>
                        <div className="date-wrapper">
                            {!finalizedGame && `Year ${currentYear} Quarter ${currentQuarter}`}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Game;
