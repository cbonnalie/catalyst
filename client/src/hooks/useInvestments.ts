import {useState} from "react"
import {Investment} from "../@types/types"

export const useInvestments = () => {
    const [liveUserInvestments, setLiveUserInvestments] = useState<Investment[]>([]);
    const [completedUserInvestments, setCompletedUserInvestments] = useState<Investment[]>([]);
    const [recentlyCompletedInvestments, setRecentlyCompletedInvestments] = useState<Investment[]>([]);
    const [userBalance, setUserBalance] = useState<number>(10000);

    /**
     * Function to update the investments.
     * @param newChoice - The new investment choice to be added.
     */
    const updateInvestments = (newChoice: Investment) => {
        setLiveUserInvestments((prev) => [...prev, newChoice]);
        setUserBalance((prev) => prev - newChoice.investment_amount);
    };

    /**
     * Processes the investments by decrementing the time interval.
     * If the time interval reaches zero, the investment is considered completed.
     */
    const processInvestments = () => {
        setLiveUserInvestments((prevLiveInvestments) => {
            const updatedInvestments = prevLiveInvestments.map((investment) => ({
                ...investment,
                time_interval: investment.time_interval - 1,
            }));

            const expiredInvestments = updatedInvestments.filter((inv) => inv.time_interval === 0);
            const remainingInvestments = updatedInvestments.filter((inv) => inv.time_interval > 0);

            setRecentlyCompletedInvestments(expiredInvestments); // Update recent investments

            if (expiredInvestments.length > 0) {
                setCompletedUserInvestments((prev) => [...prev, ...expiredInvestments]);

                setUserBalance((prevBalance) => {
                    return expiredInvestments.reduce((total, inv) => {
                        const gain = Math.round(inv.investment_amount * inv.percent_change * 100) / 100;
                        return total + inv.investment_amount + gain;
                    }, prevBalance);
                });
            }

            return remainingInvestments;
        });
    };

    return {
        completedUserInvestments,
        recentlyCompletedInvestments, // New state for recent investments
        liveUserInvestments,
        userBalance,
        updateInvestments,
        processInvestments,
        setUserBalance,
    };
};

