function EventCard() {

    const startingFunds = 10_000

    const testEventText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    const THREE_MONTHS = "3 months"
    const SIX_MONTHS = "6 months"
    const ONE_YEAR = "1 year"
    const FIVE_YEARS = "5 years"

    return (
        <div className="event-card-container">
            <div className="event-card">
                <p>{testEventText}</p>
            </div>

            <div className="interval-container">
                <label htmlFor="1">
                    <input
                        type={"radio"}
                        id="1"
                        name={"interval"}
                        value={THREE_MONTHS}
                    />
                    {THREE_MONTHS}
                </label>

                <label htmlFor="2">
                    <input
                        type={"radio"}
                        id="2"
                        name={"interval"}
                        value={SIX_MONTHS}
                    />
                    {SIX_MONTHS}
                </label>

                <label htmlFor="3">
                    <input
                        type={"radio"}
                        id="3"
                        name={"interval"}
                        value={ONE_YEAR}
                    />
                    {ONE_YEAR}
                </label>

                <label htmlFor="4">
                    <input
                        type={"radio"}
                        id="4"
                        name={"interval"}
                        value={FIVE_YEARS}
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
                    />
                </div>
            </div>

            <div className="funds-container">
                ${startingFunds}
            </div>
        </div>
    )
}

export default EventCard;
