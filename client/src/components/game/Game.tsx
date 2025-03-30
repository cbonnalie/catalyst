import {useState} from "react"
import Header from "../common/Header"
import EventCard from "../common/EventCard"
import InvestmentResults from "../game/InvestmentResults"
import {useEvents} from "../../hooks/useEvents"
import {useInvestments} from "../../hooks/useInvestments"
import "../../styles/Play.css"

/**
 * Game component that handles the main game logic and UI.
 */
const Game = () => {
    const {events, loading, error} = useEvents()
    const {completedChoices, balance, updateInvestments, processInvestments} = useInvestments()
    const [currentEventIndex, setCurrentEventIndex] = useState(0)
    const [investmentAmount, setInvestmentAmount] = useState<string>("")
    const [selectedInterval, setSelectedInterval] = useState<"" | "3 months" | "6 months" | "1 year" | "5 years">("")

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

        const {time, percent} = intervals[selectedInterval as keyof typeof intervals]

        // add the investment to the user's choices
        updateInvestments({
            description: currentEvent.description,
            investment_amount: investment,
            time_interval: time,
            percent_change: percent,
        })

        setCurrentEventIndex((prev) => prev + 1)
        setInvestmentAmount("")
        setSelectedInterval("")
        processInvestments()
    }

    return (
        <>
            <Header/>
            <EventCard
                event={currentEvent}
                investmentAmount={investmentAmount}
                selectedInterval={selectedInterval}
                onInvestmentChange={(e) => setInvestmentAmount(e.target.value)}
                onIntervalChange={(e) => setSelectedInterval(
                    e.target.value as "3 months" | "6 months" | "1 year" | "5 years"
                )}
                onSubmit={handleSubmit}
            />
            <div className="funds-container">${balance.toFixed(2)}</div>
            <InvestmentResults choicesToProcess={completedChoices}/>
        </>
    );
};

export default Game;
