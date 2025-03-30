import {useState, useEffect} from "react"
import {fetchFiveEvents} from "../utils/DBFunctions"
import {Event} from "../@types/types"

/**
 * Hook to fetch and manage events data.
 */
export const useEvents = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    // Fetch events when the component mounts
    useEffect(() => {
        async function loadEvents() {
            try {
                const fetchedEvents = await fetchFiveEvents()
                setEvents(fetchedEvents)
            } catch (err: any) {
                setError(err.message || "Failed to load events")
            } finally {
                setLoading(false)
            }
        }

        loadEvents()
    }, [])

    return {events, loading, error}
};
