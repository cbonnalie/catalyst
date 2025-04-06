import {useState} from "react";
import {Investment} from "../@types/types.ts";

export const useFinalization = (
    {
        liveUserInvestments,
        userBalance,
        currentYear,
        currentQuarter,
        setUserBalance,
        setBalanceHistory,
    }: {
        liveUserInvestments: any[];
        userBalance: number;
        currentYear: number;
        currentQuarter: number;
        setUserBalance: (balance: number) => void;
        setBalanceHistory: (history: any) => void;
    }) => {
    const [finalizedGame, setFinalizedGame] = useState(false);

    const finalizeGame = () => {
        if (finalizedGame) return;

        const additionalBalance = liveUserInvestments.reduce(
            (total: number, investment: Investment): number => {
                const gain = investment.investment_amount * investment.percent_change;
                const gain_rounded = Math.round((gain * 100) / 100);
                return total + investment.investment_amount + gain_rounded;
            }, 0);

        const finalBalance = userBalance + additionalBalance;
        setUserBalance(finalBalance);

        setBalanceHistory((prev: any[]) => {
            const turn = `Y${currentYear} Q${currentQuarter}`;
            if (prev.some(entry => entry.turn === turn)) return prev;
            return [...prev, {turn, balance: finalBalance}];
        });

        setFinalizedGame(true);
    };

    return {finalizeGame, finalizedGame};
};