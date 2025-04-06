import {useState} from "react"
import {Investment, InvestmentHistory} from "../@types/types"

export const useInvestments = () => {
    const [userBalance, setUserBalance] = useState<number>(10000);
    const [balanceHistory, setBalanceHistory] = useState<InvestmentHistory[]>([]);
    const [liveUserInvestments, setLiveUserInvestments] = useState<Investment[]>([]);
    const [completedUserInvestments, setCompletedUserInvestments] = useState<Investment[]>([]);
    const [recentlyCompletedInvestments, setRecentlyCompletedInvestments] = useState<Investment[]>([]);

    /**
     * Function to update the investments.
     * @param newChoice - The new investment choice to be added.
     */
    const updateInvestments: (newChoice: Investment) => void = (newChoice: Investment): void => {
        setLiveUserInvestments((prev: Investment[]): Investment[] => [...prev, newChoice]);

        if (newChoice.type === "Invest") {
            setUserBalance((prev: number): number => prev - newChoice.investment_amount);
        } else if (newChoice.type === "Short") {
            setUserBalance((prev: number): number => prev + newChoice.investment_amount);
        }
    };

    /**
     * Processes the investments by decrementing the time interval.
     * If the time interval reaches zero, the investment is considered completed.
     */
    const processInvestments = (): void => {
        setLiveUserInvestments((prevLiveInvestments) => {
            const updatedInvestments: Investment[] = prevLiveInvestments.map(
                (investment) => ({
                ...investment,
                time_remaining: investment.time_remaining - 1,
            }));

            const expiredInvestments: Investment[] = updatedInvestments.filter(
                (inv: Investment): boolean => inv.time_remaining === 0);
            const remainingInvestments: Investment[] = updatedInvestments.filter(
                (inv: Investment): boolean => inv.time_remaining > 0);
            setRecentlyCompletedInvestments(expiredInvestments);

            if (expiredInvestments.length > 0) {

                setCompletedUserInvestments((prev) => [...prev, ...expiredInvestments]);

                setUserBalance((prevBalance) => {
                    return expiredInvestments.reduce((total, inv) => {
                        const gain = Math.round(inv.investment_amount * inv.percent_change * 100) / 100;

                        if (inv.type === "Invest" || inv.type === "Short") {
                            return total + gain;
                        }

                        return total;
                    }, prevBalance);
                });
            }

            return remainingInvestments;
        });
    };

    return {
        completedUserInvestments,
        recentlyCompletedInvestments,
        liveUserInvestments,
        userBalance,
        balanceHistory,
        updateInvestments,
        processInvestments,
        setUserBalance,
        setBalanceHistory
    };
};