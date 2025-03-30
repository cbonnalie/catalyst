import React from 'react';

interface EventCardProps {
    event: {
        event_type: string,
        description: string,
        percent_3months: number;
        percent_6months: number;
        percent_1year: number;
        percent_5years: number;
    }
    investmentAmount: string;
    selectedInterval: string;
    onInvestmentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onIntervalChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

function EventCard({
    event,
    investmentAmount,
    selectedInterval,
    onInvestmentChange,
    onIntervalChange,
    onSubmit,
}: EventCardProps) {
    const THREE_MONTHS = "3 months";
    const SIX_MONTHS = "6 months";
    const ONE_YEAR = "1 year";
    const FIVE_YEARS = "5 years";

    return (
        <div className="event-card-container">
            <div className="event-card">
                <p>{event.description}</p>
            </div>

            <div className="interval-container">
                <label htmlFor="3months">
                    <input
                        type={"radio"}
                        id="3months"
                        name={"interval"}
                        value={THREE_MONTHS}
                        checked={selectedInterval === THREE_MONTHS}
                        onChange={onIntervalChange}
                    />
                    {THREE_MONTHS}
                </label>

                <label htmlFor="6months">
                    <input
                        type={"radio"}
                        id="6months"
                        name={"interval"}
                        value={SIX_MONTHS}
                        checked={selectedInterval === SIX_MONTHS}
                        onChange={onIntervalChange}
                    />
                    {SIX_MONTHS}
                </label>

                <label htmlFor="1year">
                    <input
                        type={"radio"}
                        id="1uear"
                        name={"interval"}
                        value={ONE_YEAR}
                        checked={selectedInterval === ONE_YEAR}
                        onChange={onIntervalChange}
                    />
                    {ONE_YEAR}
                </label>

                <label htmlFor="5years">
                    <input
                        type={"radio"}
                        id="5years"
                        name={"interval"}
                        value={FIVE_YEARS}
                        checked={selectedInterval === FIVE_YEARS}
                        onChange={onIntervalChange}
                    />
                    {FIVE_YEARS}
                </label>
            </div>

            <div className="investment-container">
                Amount to invest:
                <div className={"input-wrapper"}>
                    <span className={"dollar-sign"}>$</span>
                    <input
                        type={"text"}
                        id={"investment"}
                        name={"investment"}
                        placeholder={"enter text here"}
                        value={investmentAmount}
                        onChange={onInvestmentChange}
                    />
                </div>
            </div>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}

export default EventCard;
