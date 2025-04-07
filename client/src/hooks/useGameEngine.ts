// hooks/useGameEngine.ts
import { useEvents } from "./useEvents";
import { useInvestments } from "./useInvestments";
import { useGameProgress } from "./useGameProgress";
import { useFinalization } from "./useFinalization";
import { useState, useEffect } from "react";

export const useGameEngine = () => {
    const { events, loading, error } = useEvents();

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

    const {
        currentEventIndex,
        currentQuarter,
        currentYear,
        advanceTurn,
    } = useGameProgress();

    const [investmentAmount, setInvestmentAmount] = useState("");
    const [selectedInterval, setSelectedInterval] = useState<"" | "3 months" | "6 months" | "1 year" | "5 years">("");
    const [selectedType, setSelectedType] = useState<"" | "Invest" | "Short" | "Skip">("");

    const { finalizeGame, finalizedGame } = useFinalization({
        liveUserInvestments,
        userBalance,
        currentYear,
        currentQuarter,
        setUserBalance,
        setBalanceHistory,
    });

    const currentEvent = events[currentEventIndex];

    const handleSubmit = () => {
        if ((!investmentAmount || !selectedInterval || !selectedType) && selectedType !== "Skip") return;
        const investment = parseFloat(investmentAmount);
        if ((isNaN(investment) || investment > userBalance) && selectedType !== "Skip") return;

        const intervals = {
            "": { time: 0, percent: 0 }, // should not happen
            "3 months": { time: 1, percent: currentEvent.percent_3months },
            "6 months": { time: 2, percent: currentEvent.percent_6months },
            "1 year": { time: 4, percent: currentEvent.percent_1year },
            "5 years": { time: 20, percent: currentEvent.percent_5years },
        };

        const { time, percent } = intervals[selectedInterval];

        updateInvestments({
            description: currentEvent.description,
            investment_amount: investment,
            time_interval: time,
            time_remaining: time,
            percent_change: percent,
            type: selectedType
        });

        setInvestmentAmount("");
        setSelectedInterval("");
        setSelectedType("");

        advanceTurn();
        processInvestments();
    };

    useEffect(() => {
        setBalanceHistory((prev) => {
            const turn = `Y${currentYear} Q${currentQuarter}`;
            if (prev.some(entry => entry.turn === turn)) return prev;
            return [...prev, { turn, balance: userBalance }];
        });
    }, [currentYear, currentQuarter]);

    return {
        events,
        loading,
        error,
        currentEvent,
        investmentAmount,
        setInvestmentAmount,
        selectedInterval,
        selectedType,
        setSelectedInterval,
        setSelectedType,
        currentYear,
        currentQuarter,
        userBalance,
        balanceHistory,
        completedUserInvestments,
        recentlyCompletedInvestments,
        liveUserInvestments,
        handleSubmit,
        finalizeGame,
        finalizedGame,
        isGameOver: currentEventIndex >= events.length,
    };
};
