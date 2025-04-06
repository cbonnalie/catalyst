import React from "react"
import {Event} from "../../@types/types"

/**
 * Defines props for the EventCardInput component
 */
interface EventCardProps {
    event: Event
    investmentAmount: string
    selectedInterval: string
    selectedType: string
    onInvestmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    onSubmit: () => void
}

/**
 * EventCardInput component to display event details and allow user input for investments
 * @param event                 - event to display in the card
 * @param investmentAmount      - amount to invest
 * @param selectedInterval      - selected time interval
 * @param selectedType
 * @param onInvestmentChange    - handler for changing investment amount
 * @param onIntervalChange      - handler for changing the investment interval
 * @param onTypeChange
 * @param onSubmit              - handler for submitting the investment
 */
const EventCardInput: React.FC<EventCardProps> = (
    {
        event,
        investmentAmount,
        selectedInterval,
        selectedType,
        onInvestmentChange,
        onIntervalChange,
        onTypeChange,
        onSubmit,
    }: EventCardProps) => {
    return (
        <div className={"row1"}>
            <div className="event-card-wrapper">
                <div className="event-card"> {/* event card container */}
                    <h2>{event.description}</h2>
                </div>

                <div className="investment-grid">
                    {/* Column 1: Investment Lengths */}
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

                    {/* Column 2: Investment Types */}
                    <div className="grid-column">
                        <label className={`option-box ${selectedType === "Invest" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="option"
                                value="Invest"
                                checked={selectedType === "Invest"}
                                onChange={onTypeChange}
                                className="hidden-radio"
                            />
                            Invest
                        </label>
                        <label className={`option-box ${selectedType === "Short" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="option"
                                value="Short"
                                checked={selectedType === "Short"}
                                onChange={onTypeChange}
                                className="hidden-radio"
                            />
                            Short
                        </label>
                        <label className={`option-box ${selectedType === "Skip" ? "selected" : ""}`}>
                            <input
                                type="radio"
                                name="option"
                                value="Skip"
                                checked={selectedType === "Skip"}
                                onChange={onTypeChange}
                                className="hidden-radio"
                            />
                            Skip
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
                        <button onClick={onSubmit} className="invest-button">Continue</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventCardInput;

