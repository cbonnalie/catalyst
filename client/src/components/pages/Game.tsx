import React, {useState, useEffect} from "react";
import {fetchFiveEvents} from "../utils/DBFunctions";
import Header from "../common/Header"
import EventCard from "../common/EventCard"
import "../styles/Play.css"

/**
 * Represents the structure of an event object.
 */
interface Event {
    event_type: string,
    description: string,
    percent_3months: number,
    percent_6months: number,
    percent_1year: number,
    percent_5years: number
}

/**
 * Represents the structure of a user's investment choice.
 */
interface userChoice {
    description: string,
    investment_amount: number,
    time_interval: number,
    percent_change: number,
}

const startingBalance = 10_000
let balance = startingBalance

/**
 * Game component that manages the game state and renders the game UI.
 * @constructor
 */
function Game() {
    const [events, setEvents] = useState<Event[]>([])
    const [currentEventIndex, setCurrentEventIndex] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [userChoices, setUserChoices] = useState<userChoice[]>([])
    const [investmentAmount, setInvestmentAmount] = useState<string>("")
    const [selectedInterval, setSelectedInterval] = useState<string>("")

    /**
     * Effect hook to load events from the database when the component mounts.
     */
    useEffect(() => {
        async function loadEvents() {
            setLoading(true);
            setError(null);
            try {
                const fetchedEvents = await fetchFiveEvents()
                setEvents(fetchedEvents)
            } catch (err: any) {
                setError(err.message || "Failed to load events");
                setEvents([])
            } finally {
                setLoading(false);
            }
        }

        loadEvents();
    }, []) // run only on mount


    // render loading or error states
    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (events.length === 0) return <div>No events found.</div>

    // get the current event
    const currentEvent = events[currentEventIndex];

    /**
     * Handles changes to the investment amount input field
     * @param e - The change event.
     */
    const handleInvestmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvestmentAmount(e.target.value)
    }

    /**
     * Handles changes to the selected time interval radio buttons.
     * @param e - The change event.
     */
    const handleIntervalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedInterval(e.target.value)
    }

    /**
     * Handles the submission of the user's investment choice.
     */
    const handleSubmit = () => {
        // validate input
        if (!investmentAmount || !selectedInterval) return

        const investment = parseFloat(investmentAmount)
        if (isNaN(investment)) return

        // determine time interval and percent change
        let timeInterval: number = 0;
        let percentChange: number = 0;
        switch (selectedInterval) {
            case "3 months":
                timeInterval = 1
                percentChange = currentEvent.percent_3months
                break;
            case "6 months":
                timeInterval = 2
                percentChange = currentEvent.percent_6months
                break;
            case "1 year":
                timeInterval = 4
                percentChange = currentEvent.percent_1year
                break;
            case "5 years":
                timeInterval = 20
                percentChange = currentEvent.percent_5years
                break;
            default:
                return;
        }

        // create a new user choice object
        const newUserChoice: userChoice = {
            description: currentEvent.description,
            investment_amount: investment,
            time_interval: timeInterval,
            percent_change: percentChange,
        }

        // update state with the new user choice and move to the next event
        setUserChoices([...userChoices, newUserChoice]);

        // update the balance
        balance -= investment
        setCurrentEventIndex(currentEventIndex + 1)
        setInvestmentAmount("")
        setSelectedInterval("")
    }

    // render the game UI
    return (
        <>
            <Header/>
            <EventCard
                event={currentEvent}
                investmentAmount={investmentAmount}
                selectedInterval={selectedInterval}
                onInvestmentChange={handleInvestmentChange}
                onIntervalChange={handleIntervalChange}
                onSubmit={handleSubmit}
            />
            <div className="funds-container">${balance.toFixed(2)}</div>
        </>
    )
}

export default Game