import {Investment} from "../../@types/types"

/**
 * Interface for the InvestmentResults component props.
 */
interface InvestmentResultsProps {
    choicesToProcess: Investment[]
    areFinalized: boolean
}

/**
 * InvestmentResults component displays the results of the investments made by the user.
 * @param choicesToProcess  - An array of Investment objects representing the investments made by the user.
 * @param areFinalized      - A boolean indicating whether the investments have been finalized or not.
 * @constructor             - A functional component that renders the investment results.
 */
export const RenderInvestments = (
    {choicesToProcess, areFinalized}: InvestmentResultsProps,
) => {
    return (
        <div className="results-container">
            <h3>{areFinalized ? "Completed Investments" : "Current Investments"}</h3>
            {choicesToProcess.map((choice, index) => (
                <div key={index} className="results-wrapper">
                    <p className="result-description">{choice.description}</p>
                    <p>Investment: ${choice.investment_amount.toFixed(2)}</p>
                    {areFinalized && (
                        <>
                            <p>Percent Change: {choice.percent_change.toFixed(2)}%</p>
                            <p>Gain: ${(choice.investment_amount * choice.percent_change).toFixed(2)}</p>
                        </>
                    )}
                </div>
            ))}
        </div>
    )
}