import { useState } from "react";
import EventCard from "../common/EventCard";
import InvestmentResults from "../game/InvestmentResults";
import { useEvents } from "../../hooks/useEvents";
import { useInvestments } from "../../hooks/useInvestments";
import "../../styles/Game.css";

/**
 * Game component that handles the main game logic and UI.
 */
const Game = () => {
    const { events, loading, error } = useEvents();
    const {
        completedUserInvestments: completedUserInvestments,
        recentlyCompletedInvestments: recentlyCompletedInvestments,
        liveUserInvestments: liveUserInvestments,
        userBalance: userBalance,
        updateInvestments,
        processInvestments,
        setUserBalance,
    } = useInvestments();

    const [currentEventIndex, setCurrentEventIndex] = useState(0);
    const [investmentAmount, setInvestmentAmount] = useState<string>("");
    const [selectedInterval, setSelectedInterval] = useState<"" | "3 months" | "6 months" | "1 year" | "5 years">("");
    const [currentQuarter, setCurrentQuarter] = useState<number>(1);
    const [currentYear, setCurrentYear] = useState<number>(1);
    const [finalizedGame, setFinalizedGame] = useState<boolean>(false);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (events.length === 0) return <div>No events found.</div>;

    const currentEvent = events[currentEventIndex];

    /**
     * Handles investment submission.
     */
    const handleSubmit = () => {
        if (!investmentAmount || !selectedInterval) return;
        const investment = parseFloat(investmentAmount);
        if (isNaN(investment) || investment > userBalance) return;

        const intervals = {
            "3 months": { time: 1, percent: currentEvent.percent_3months },
            "6 months": { time: 2, percent: currentEvent.percent_6months },
            "1 year": { time: 4, percent: currentEvent.percent_1year },
            "5 years": { time: 20, percent: currentEvent.percent_5years },
        };

        const { time, percent } = intervals[selectedInterval as keyof typeof intervals];

        updateInvestments({
            description: currentEvent.description,
            investment_amount: investment,
            time_interval: time,
            percent_change: percent,
        });

        updateGameProgress();
    };

    /**
     * Updates the game timeline and processes investments.
     */
    const updateGameProgress = () => {
        setCurrentEventIndex((prev) => prev + 1);
        setCurrentQuarter((prev) => (prev % 4) + 1);
        setCurrentYear((prev) => (currentQuarter === 4 ? prev + 1 : prev));
        setInvestmentAmount("");
        setSelectedInterval("");
        processInvestments();
    };

    /**
     * Finalizes the game by cashing out all live investments.
     */
    const finalizeGame = () => {
        if (finalizedGame) return;

        const additionalBalance = liveUserInvestments.reduce((total, investment) => {
            const gain = Math.round(investment.investment_amount * investment.percent_change * 100) / 100;
            return total + investment.investment_amount + gain;
        }, 0);

        setUserBalance((prev) => prev + additionalBalance);
        setFinalizedGame(true);
    };

    const isGameOver = currentEventIndex >= events.length;

    return (
        <>
            <div className="event-card-wrapper">
                {isGameOver ? (
                    <EndGameSummary
                        balance={userBalance}
                        completedInvestments={completedUserInvestments}
                        liveInvestments={liveUserInvestments}
                        finalizeGame={finalizeGame}
                        finalizedGame={finalizedGame}
                    />
                ) : (
                    <>
                        <EventCard
                            event={currentEvent}
                            investmentAmount={investmentAmount}
                            selectedInterval={selectedInterval}
                            onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                            onIntervalChange={(e) => setSelectedInterval(e.target.value as "3 months" | "6 months" | "1 year" | "5 years")}
                            onSubmit={handleSubmit}
                        />
                        <InvestmentResults choicesToProcess={recentlyCompletedInvestments} />
                    </>
                )}
            </div>
            <div className="balance-container">${userBalance.toFixed(2)}</div>
            <div className="date-tracker">
                {!finalizedGame && `Year ${currentYear} Quarter ${currentQuarter}`}
            </div>
        </>
    );
};

/**
 * Displays the summary at the end of the game.
 */
const EndGameSummary = ({ balance, completedInvestments, liveInvestments, finalizeGame, finalizedGame }: {
    balance: number;
    completedInvestments: any[];
    liveInvestments: any[];
    finalizeGame: () => void;
    finalizedGame: boolean;
}) => {
    if (!finalizedGame) finalizeGame();

    return (
        <div className="end-game-summary">
            <h3>End Game Summary</h3>
            <p>Final Balance: ${balance.toFixed(2)}</p>
            <InvestmentList title="Completed Investments" investments={completedInvestments} />
            {liveInvestments.length > 0 && <InvestmentList title="Live Investments Cashed Out at End" investments={liveInvestments} />}
        </div>
    );
};

/**
 * Renders a list of investments.
 */
const InvestmentList = ({ title, investments }: { title: string; investments: any[] }) => (
    <div>
        <h4>{title}</h4>
        {investments.map((investment, index) => (
            <div key={index} className="summary-investment">
                <p>{investment.description}</p>
                <p>Investment: ${investment.investment_amount.toFixed(2)}</p>
                <p>Time Interval: {investment.time_interval} months</p>
                <p>Percent Change: {investment.percent_change.toFixed(2)}%</p>
                <p>
                    Gain: ${Math.round(investment.investment_amount * investment.percent_change * 100) / 100}
                </p>
            </div>
        ))}
    </div>
);

export default Game;
