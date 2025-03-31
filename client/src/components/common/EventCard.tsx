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
        <>
            <div className="event-card"> {/* event card container */}
                <h2>{event.description}</h2>
            </div>
            <div className={"interval-options"}>
                {/* maps through available intervals to create radio buttons */}
                {["3 months", "6 months", "1 year", "5 years"].map((interval) => (
                    <label key={interval} className={`interval-box ${selectedInterval === interval ? "selected" : ""}`}>
                        <input
                            type="radio"
                            name={"interval"}
                            value={interval}
                            checked={selectedInterval === interval}
                            onChange={onIntervalChange}
                            className={"hidden-radio"}
                        />
                        {interval}
                    </label>
                ))}
            </div>

            <input
                type="number" value={investmentAmount}
                onChange={onInvestmentChange}
                placeholder="Investment Amount"
            />

            <button onClick={onSubmit}>Invest</button>
        </>
    )
}

export default EventCard;
