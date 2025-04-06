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
    }: EventCardProps) => {
    return (
        <div className={"row1"}>
            <div className="event-card-wrapper">
                <div className="event-card"> {/* event card container */}
                    <h2>{event.description}</h2>
                </div>

                <div className="investment-grid">
                    {/* Column 1: 3 months and 6 months */}
                    <div className="grid-column">
                        <label className={`interval-box ${selectedInterval === "3 months" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="interval"
                                value="3 months"
                                checked={selectedInterval === "3 months"}
                                onChange={onIntervalChange}
                                className="hidden-radio"
                            />
                            3 months
                        </label>
                        <label className={`interval-box ${selectedInterval === "6 months" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="interval"
                                value="6 months"
                                checked={selectedInterval === "6 months"}
                                onChange={onIntervalChange}
                                className="hidden-radio"
                            />
                            6 months
                        </label>
                    </div>

                    {/* Column 2: 1 year and 5 years */}
                    <div className="grid-column">
                        <label className={`interval-box ${selectedInterval === "1 year" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="interval"
                                value="1 year"
                                checked={selectedInterval === "1 year"}
                                onChange={onIntervalChange}
                                className="hidden-radio"
                            />
                            1 year
                        </label>
                        <label className={`interval-box ${selectedInterval === "5 years" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="interval"
                                value="5 years"
                                checked={selectedInterval === "5 years"}
                                onChange={onIntervalChange}
                                className="hidden-radio"
                            />
                            5 years
                        </label>
                    </div>

                    {/* Column 3: Investment amount and invest button */}
                    <div className="grid-column">
                        <input
                            type="number"
                            value={investmentAmount}
                            onChange={onInvestmentChange}
                            placeholder="Investment Amount"
                            className="investment-amount"
                        />
                        <button onClick={onSubmit} className="invest-button">Invest</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCard;