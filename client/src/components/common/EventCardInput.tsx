import React from "react";
import {Event, InvestmentType, TimeInterval} from "../../@types/types";
import {isValidInvestment} from "../../utils/investmentUtils";

/**
 * Props for the EventCardInput component
 */
interface EventCardProps {
    event: Event;
    investmentAmount: string;
    selectedInterval: TimeInterval;
    selectedType: InvestmentType | "";
    userBalance: number;
    onInvestmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

/**
 * EventCardInput component to display event details and allow user input for investments
 */
const EventCardInput: React.FC<EventCardProps> = (
    {
        event,
        investmentAmount,
        selectedInterval,
        selectedType,
        userBalance,
        onInvestmentChange,
        onIntervalChange,
        onTypeChange,
        onSubmit,
    }) => {
    // Check if the current selection is valid for submission
    const isValid =
        (selectedType === "Skip") ||
        (selectedType &&
            selectedInterval &&
            isValidInvestment(investmentAmount, userBalance, selectedType));

    // When Skip is selected, disable other fields
    const isSkipSelected = selectedType === "Skip";

    return (
        <div className="row1">
            <div className="event-card-wrapper">
                <div className="event-card">
                    <h2>{event.description}</h2>
                </div>

                <div className="investment-grid">
                    {/* Column 1: Investment Lengths */}
                    <div className="grid-column">
                        <IntervalOptions
                            selectedInterval={selectedInterval}
                            onIntervalChange={onIntervalChange}
                            disabled={isSkipSelected}
                        />
                    </div>

                    {/* Column 2: Investment Types */}
                    <div className="grid-column">
                        <InvestmentTypeOptions
                            selectedType={selectedType}
                            onTypeChange={onTypeChange}
                        />
                    </div>

                    {/* Column 3: Investment amount and invest button */}
                    <div className="grid-column">
                        <input
                            type="number"
                            value={investmentAmount}
                            onChange={onInvestmentChange}
                            placeholder="Investment Amount"
                            className="investment-amount"
                            disabled={isSkipSelected}
                        />
                        <button
                            onClick={onSubmit}
                            className="invest-button"
                            disabled={!isValid}
                        >
                            Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface IntervalOptionsProps {
    selectedInterval: TimeInterval;
    onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
}

const IntervalOptions: React.FC<IntervalOptionsProps> = (
    {
        selectedInterval,
        onIntervalChange,
        disabled
    }) => {
    const intervals: TimeInterval[] = ["3 months", "6 months", "1 year", "5 years"];

    return (
        <>
            {intervals.map((interval) => (
                <label
                    key={interval}
                    className={`interval-box ${selectedInterval === interval ? "selected" : ""} ${disabled ? "disabled" : ""}`}
                >
                    <input
                        type="radio"
                        name="interval"
                        value={interval}
                        checked={selectedInterval === interval}
                        onChange={onIntervalChange}
                        className="hidden-radio"
                        disabled={disabled}
                    />
                    {interval}
                </label>
            ))}
        </>
    );
};

interface InvestmentTypeOptionsProps {
    selectedType: InvestmentType | "";
    onTypeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InvestmentTypeOptions: React.FC<InvestmentTypeOptionsProps> = (
    {
        selectedType,
        onTypeChange
    }) => {
    const types: InvestmentType[] = ["Invest", "Short", "Skip"];

    return (
        <>
            {types.map((type) => (
                <label
                    key={type}
                    className={`option-box ${selectedType === type ? "selected" : ""}`}
                >
                    <input
                        type="radio"
                        name="option"
                        value={type}
                        checked={selectedType === type}
                        onChange={onTypeChange}
                        className="hidden-radio"
                    />
                    {type}
                </label>
            ))}
        </>
    );
};

export default EventCardInput;