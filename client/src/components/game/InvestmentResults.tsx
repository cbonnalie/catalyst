import { Investment } from "../../@types/types"

/**
 * Interface for the InvestmentResults component props.
 */
interface InvestmentResultsProps {
    choicesToProcess: Investment[]
}

/**
 * InvestmentResults component displays the results of the investments made by the user.
 * @param choicesToProcess  - An array of Investment objects representing the investments made by the user.
 * @constructor             - A functional component that renders the investment results.
 */
const InvestmentResults = ({ choicesToProcess }: InvestmentResultsProps) => {
    return (
        <div className="results-container">
            <h3>Recently Completed Investments</h3>
            {choicesToProcess.map((choice, index) => (
                <div key={index} className="results-wrapper">
                    <p className="result-description">{choice.description}</p>
                    <p>Investment: ${choice.investment_amount.toFixed(2)}</p>
                    <p>Percent Change: {choice.percent_change.toFixed(2)}%</p>
                    <p>Gain: ${(choice.investment_amount * choice.percent_change).toFixed(2)}</p>
                </div>
            ))}
        </div>
    )
}

export default InvestmentResults
