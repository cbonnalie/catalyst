import {useState} from "react"
import EventCard from "../common/EventCard"
import InvestmentResults from "../game/InvestmentResults"
import {useEvents} from "../../hooks/useEvents"
import {useInvestments} from "../../hooks/useInvestments"
import "../../styles/Game.css"

/**
 * Game component that handles the main game logic and UI.
 */
const Game = () => {
    const {events, loading, error} = useEvents()
    const {
        completedChoices,
        balance,
        updateInvestments,
        processInvestments,
        allInvestments,
        liveUserInvestments,
        setUserBalance,
    } = useInvestments()
    const [currentEventIndex, setCurrentEventIndex] = useState(0)
    const [investmentAmount, setInvestmentAmount] = useState<string>("")
    const [selectedInterval, setSelectedInterval] = useState<
        "" | "3 months" | "6 months" | "1 year" | "5 years"
    >("")
    const [currentQuarter, setCurrentQuarter] = useState<number>(1)
    const [currentYear, setCurrentYear] = useState<number>(1)
    const [finalizedGame, setFinalizedGame] = useState<boolean>(false)

    // render loading, error, and no events found states if applicable
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (events.length === 0) return <div>No events found.</div>

    // the current event to display
    const currentEvent = events[currentEventIndex]

    /**
     * Handles the submission of the investment form.
     */
    const handleSubmit = () => {

        // check if the investment amount and selected interval are valid
        if (!investmentAmount || !selectedInterval) return
        const investment = parseFloat(investmentAmount)
        if (isNaN(investment)) return

        // investment intervals and their corresponding time and percent values
        const intervals = {
            "3 months": {time: 1, percent: currentEvent.percent_3months},
            "6 months": {time: 2, percent: currentEvent.percent_6months},
            "1 year": {time: 4, percent: currentEvent.percent_1year},
            "5 years": {time: 20, percent: currentEvent.percent_5years},
        };

        const {time, percent} = intervals[
            selectedInterval as keyof typeof intervals
            ]

        // add the investment to the user's choices
        updateInvestments({
            description: currentEvent.description,
            investment_amount: investment,
            time_interval: time,
            percent_change: percent,
        })

        let newQuarter = currentQuarter + 1
        let newYear = currentYear

        if (newQuarter > 4) {
            newQuarter -= 4
            newYear += 1
        }

        setCurrentQuarter(newQuarter)
        setCurrentYear(newYear)
        setCurrentEventIndex((prev) => prev + 1)

        if (currentEventIndex < events.length - 1) {
            setInvestmentAmount("")
            setSelectedInterval("")
            processInvestments()
        }
    }

    /**
     * Finalizes the game by calculating gains from live investments
     * and adding them to the final balance.
     */
    const finalizeGame = () => {
        // Only run this once
        if (finalizedGame) return;

        // Calculate the value of all live investments and add to balance
        let additionalBalance = 0;

        liveUserInvestments.forEach(investment => {
            // Calculate the current value with partial gains based on time invested
            const originalAmount = investment.investment_amount;
            const gain = Math.round(originalAmount * investment.percent_change * 100) / 100;
            additionalBalance += originalAmount + gain;
        });

        // Update the balance
        setUserBalance(prevBalance => prevBalance + additionalBalance);
        setFinalizedGame(true);
    }

    const displayEndGameSummary = () => {
        // When displaying end game summary, finalize the game
        if (!finalizedGame) {
            finalizeGame();
        }


        const completedInvestments = allInvestments.filter(investment => {
            return !liveUserInvestments.some(liveInv =>
                liveInv.description === investment.description &&
                liveInv.investment_amount === investment.investment_amount &&
                liveInv.time_interval === investment.time_interval &&
                liveInv.percent_change === investment.percent_change
            );
        });


        return (
            <div className={"end-game-summary"}>
                <h3>End Game Summary</h3>
                <p>Final Balance: ${balance.toFixed(2)}</p>
                <h4>Completed Investments:</h4>
                {completedInvestments.map((investment, index) => (
                    <div key={index} className={"summary-investment"}>
                        <p>{investment.description}</p>
                        <p>Investment: ${investment.investment_amount.toFixed(2)}</p>
                        <p>Time Interval: {investment.time_interval} months</p>
                        <p>Percent Change: {investment.percent_change.toFixed(2)}%</p>
                        <p>
                            Gain: ${Math.round(
                            investment.investment_amount * investment.percent_change * 100) / 100
                        }
                        </p>
                    </div>
                ))}

                {liveUserInvestments.length > 0 && (
                    <div>
                        <h4>Live Investments Cashed Out at End:</h4>
                        {liveUserInvestments.map((investment, index) => (
                            <div key={`live-${index}`} className={"summary-investment"}>
                                <p>{investment.description}</p>
                                <p>Investment: ${investment.investment_amount.toFixed(2)}</p>
                                <p>Time Remaining: {investment.time_interval} quarters</p>
                                <p>Percent Change: {investment.percent_change.toFixed(2)}%</p>
                                <p>
                                    Gain: ${Math.round(
                                    investment.investment_amount * investment.percent_change * 100) / 100
                                }
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        )
    }

    const isGameOver = currentEventIndex >= events.length

    return (
        <>
            <div className={"event-card-wrapper"}>
                {isGameOver ? (
                    displayEndGameSummary()
                ) : (
                    <>
                        <EventCard
                            event={currentEvent}
                            investmentAmount={investmentAmount}
                            selectedInterval={selectedInterval}
                            onInvestmentChange={(e) =>
                                setInvestmentAmount(e.target.value)
                            }
                            onIntervalChange={(e) =>
                                setSelectedInterval(
                                    e.target.value as
                                        | "3 months"
                                        | "6 months"
                                        | "1 year"
                                        | "5 years"
                                )
                            }
                            onSubmit={handleSubmit}
                        />
                        <InvestmentResults choicesToProcess={completedChoices}/>
                    </>
                )}
            </div>
            <div className="balance-container">${balance.toFixed(2)}</div>
            <div className="date-tracker">
                {!finalizedGame && `Year ${currentYear} Quarter ${currentQuarter}`}
            </div>
        </>
    );
};

export default Game;