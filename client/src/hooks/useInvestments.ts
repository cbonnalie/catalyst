import {useState} from "react"
import {Investment} from "../@types/types"

/**
 * Hook to manage investments.
 */
export const useInvestments = () => {
    const [liveUserChoices, setLiveUserChoices] = useState<Investment[]>([])
    const [completedChoices, setCompletedChoices] = useState<Investment[]>([])
    const [balance, setBalance] = useState<number>(10000)

    /**
     * Function to update the investments.
     * @param newChoice - The new investment choice to be added.
     */
    const updateInvestments = (newChoice: Investment) => {
        setLiveUserChoices([...liveUserChoices, newChoice])
        setBalance((prev) => prev - newChoice.investment_amount)
    }

    /**
     * Processes the investments by decrementing the time interval.
     * If the time interval reaches zero, the investment is considered completed.
     */
    const processInvestments = () => {
        setCompletedChoices([])
        setLiveUserChoices((prevChoices) => {
            const updatedChoices = prevChoices.map(
                (choice) => ({
                    ...choice,
                    time_interval: choice.time_interval - 1,
                }))

            const expiredChoices = updatedChoices.filter(
                (choice) => choice.time_interval === 0)

            const remainingChoices = updatedChoices.filter(
                (choice) => choice.time_interval > 0)

            // Update completed investments
            setCompletedChoices((prev) => [...prev, ...expiredChoices])

            // Update balance based on completed investments
            expiredChoices.forEach((choice) => {
                const gain = Math.round(choice.investment_amount * choice.percent_change * 100) / 100;
                setBalance((prev) => prev + choice.investment_amount + gain)
            })

            // Only keep the investments that still have time left
            return remainingChoices
        })
    }

    return {liveUserChoices, completedChoices, balance, updateInvestments, processInvestments}
}
