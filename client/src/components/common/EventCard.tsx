import React from "react"
import {Event} from "../../@types/types"

/**
 * Defines props for the EventCard component
 */
interface EventCardProps {
    event: Event
    investmentAmount: string
    selectedInterval: string
    onInvestmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
}

/**
 * EventCard component to display event details and allow user input for investments
 * @param event                 - event to display in the card
 * @param investmentAmount      - amount to invest
 * @param selectedInterval      - selected time interval
 * @param onInvestmentChange    - handler for changing investment amount
 * @param onIntervalChange      - handler for changing the investment interval
 * @param onSubmit              - handler for submitting the investment
 */
const EventCard: React.FC<EventCardProps> = (
    {
        event,
        investmentAmount,
        selectedInterval,
        onInvestmentChange,
        onIntervalChange,
        onSubmit,
    }) => {
    return (
        <div className="event-card"> {/* event card container */}
            <h2>{event.description}</h2>

            <input
                type="number" value={investmentAmount}
                onChange={onInvestmentChange}
                placeholder="Investment Amount"
            />

            <div>
                {/* maps through available intervals to create radio buttons */}
                {["3 months", "6 months", "1 year", "5 years"].map((interval) => (
                    <label key={interval}>
                        <input
                            type="radio"
                            value={interval}
                            checked={selectedInterval === interval}
                            onChange={onIntervalChange}
                        />
                        {interval}
                    </label>
                ))}
            </div>

            <button onClick={onSubmit}>Invest</button>
        </div>
    )
}

export default EventCard;
