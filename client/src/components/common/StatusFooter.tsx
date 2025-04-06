import {JSX} from "react"

interface StatusFooterProps {
    userBalance: number
    finalizedGame: boolean
    currentYear: number
    currentQuarter: number
}

export const StatusFooter = (
    {userBalance, finalizedGame, currentYear, currentQuarter}: StatusFooterProps
): JSX.Element => {

    return (
        <div className={"row3"}>
            <div className="balance-wrapper">${userBalance.toFixed(2)}</div>
            <div className="date-wrapper">
                {!finalizedGame && `Year ${currentYear} Quarter ${currentQuarter}`}
            </div>
        </div>
    )
}