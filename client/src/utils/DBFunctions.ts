interface Event {
    event_type: string,
    description: string,
    percent_3months: number;
    percent_6months: number;
    percent_1year: number;
    percent_5years: number;
}

export async function fetchFiveEvents(): Promise<Event[]> {
    try {
        const response = await fetch("http://localhost:3000/api/fiveEvents");
        if (!response.ok) {
            const errorText = await response.text()
            console.error("Server error:", errorText)
        }
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            console.error(`Expected application/json, but received ${contentType}`);
        }
        return await response.json()
    } catch (error) {
        console.error("Error fetching five! events:", error)
        throw error
    }
}