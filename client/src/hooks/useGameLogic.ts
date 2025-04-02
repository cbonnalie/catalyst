import {useState, useEffect} from "react";
import {useEvents} from "./useEvents";
import {useInvestments} from "./useInvestments";

export const useGameLogic = () => {
    const {events, loading, error} = useEvents();
    const {
        completedUserInvestments,
        recentlyCompletedInvestments,
        liveUserInvestments,
        userBalance,
        balanceHistory,
        updateInvestments,
        processInvestments,
        setUserBalance,
        setBalanceHistory,
    } = useInvestments();

    const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
    const [investmentAmount, setInvestmentAmount] = useState<string>("");
    const [selectedInterval, setSelectedInterval] = useState<"" | "3 months" | "6 months" | "1 year" | "5 years">("");
    const [currentQuarter, setCurrentQuarter] = useState<number>(1);
    const [currentYear, setCurrentYear] = useState<number>(1);
    const [finalizedGame, setFinalizedGame] = useState<boolean>(false);

    const currentEvent = events[currentEventIndex];

    const handleSubmit = () => {
        if (!investmentAmount || !selectedInterval) return;
        const investment = parseFloat(investmentAmount);
        if (isNaN(investment) || investment > userBalance) return;

        const intervals = {
            "3 months": {time: 1, percent: currentEvent.percent_3months},
            "6 months": {time: 2, percent: currentEvent.percent_6months},
            "1 year": {time: 4, percent: currentEvent.percent_1year},
            "5 years": {time: 20, percent: currentEvent.percent_5years},
        };

        const {time, percent} = intervals[selectedInterval as keyof typeof intervals];

        updateInvestments({
            description: currentEvent.description,
            investment_amount: investment,
            time_interval: time,
            time_remaining: time,
            percent_change: percent,
        });

        updateGameProgress();
    };

    const updateGameProgress = () => {
        setCurrentEventIndex((prev) => prev + 1);
        setCurrentQuarter((prev) => (prev % 4) + 1);
        setCurrentYear((prev) => (currentQuarter === 4 ? prev + 1 : prev));
        setInvestmentAmount("");
        setSelectedInterval("");
        processInvestments();
    };

    useEffect(() => {
        setBalanceHistory((prev) => {
            if (prev.some(entry => entry.turn === `Y${currentYear} Q${currentQuarter}`)) {
                return prev; // Prevent duplicate entries
            }
            return [...prev, {turn: `Y${currentYear} Q${currentQuarter}`, balance: userBalance}];
        });
    }, [currentYear, currentQuarter]);

    const finalizeGame = () => {
        if (finalizedGame) return;

        const additionalBalance = liveUserInvestments.reduce((total, investment) => {
            const gain = Math.round(investment.investment_amount * investment.percent_change * 100) / 100;
            return total + investment.investment_amount + gain;
        }, 0);

        const finalBalance = userBalance + additionalBalance;
        setUserBalance(finalBalance);
        setBalanceHistory((prev) => {
            if (prev.some(entry => entry.turn === `Y${currentYear} Q${currentQuarter}`)) {
                return prev; // Prevent duplicate entries
            }
            return [...prev, {turn: `Y${currentYear} Q${currentQuarter}`, balance: finalBalance}];
        });
        setFinalizedGame(true);
    };

    return {
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
        isGameOver: currentEventIndex >= events.length,
    };
};
