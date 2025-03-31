import {useState} from "react"
import {Investment} from "../@types/types"

/**
 * Hook to manage investments.
 */
export const useInvestments = () => {
    const [liveUserInvestments, setLiveUserInvestments] = useState<Investment[]>([])
    const [completedUserInvestments, setCompletedUserInvestments] = useState<Investment[]>([])
    const [allUserInvestments, setAllUserInvestments] = useState<Investment[]>([])
    const [userBalance, setUserBalance] = useState<number>(10000)

    /**
     * Function to update the investments.
     * @param newChoice - The new investment choice to be added.
     */
    const updateInvestments = (newChoice: Investment) => {
        setLiveUserInvestments([...liveUserInvestments, newChoice])
        setAllUserInvestments([...allUserInvestments, newChoice])
        setUserBalance((prev) => prev - newChoice.investment_amount)
    }

    /**
     * Processes the investments by decrementing the time interval.
     * If the time interval reaches zero, the investment is considered completed.
     */
    const processInvestments = () => {
        setCompletedUserInvestments([])
        setLiveUserInvestments((prevChoices) => {
            const updatedChoices = prevChoices.map(
                (choice) => ({
                    ...choice,
                    time_interval: choice.time_interval - 1,
                }))

            const expiredInvestments = updatedChoices.filter(
                (choice) => choice.time_interval === 0)

            const remainingInvestments = updatedChoices.filter(
                (choice) => choice.time_interval > 0)

            // Update completed investments
            setCompletedUserInvestments((prev) => [...prev, ...expiredInvestments])

            // Update balance based on completed investments
            expiredInvestments.forEach((choice) => {
                const gain = Math.round(choice.investment_amount * choice.percent_change * 100) / 100;
                setUserBalance((prev) => prev + choice.investment_amount + gain)
            })

            // Only keep the investments that still have time left
            return remainingInvestments
        })
    }

    return {
        completedChoices: completedUserInvestments,
        balance: userBalance,
        updateInvestments,
        processInvestments,
        allInvestments: allUserInvestments,
        liveUserInvestments: liveUserInvestments,
        setUserBalance,
    }
}
