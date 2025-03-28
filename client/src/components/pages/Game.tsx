import React, {useState, useEffect} from "react";
import {fetchFiveEvents} from "../utils/DBFunctions";
import Header from "../common/Header"
import EventCard from "../common/EventCard"
import "../styles/Play.css"

interface Event {
    event_type: string,
    description: string,
    percent_3months: number;
    percent_6months: number;
    percent_1year: number;
    percent_5years: number;
}

function Game() {
    const [events, setEvents] = useState<Event[]>([])
    const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

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
    }, [])

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (events.length === 0) return <div>No events found.</div>

    const currentEvent = events[currentEventIndex];

    return (
        <>
            <Header/>
            <EventCard event={currentEvent} />
        </>
    )
}

export default Game