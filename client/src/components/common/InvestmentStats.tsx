import {renderLineChart} from "../game/LineChart.tsx";
import {InvestmentCards} from "../game/InvestmentCards.tsx";
import {Investment, InvestmentHistory} from "../../@types/types.ts";
import {JSX} from "react";

interface GameInfoProps {
    balanceHistory: InvestmentHistory[]
    completedUserInvestments: Investment[]
    liveUserInvestments: Investment[]
}

export const InvestmentStats = (
    {balanceHistory, completedUserInvestments, liveUserInvestments}: GameInfoProps
): JSX.Element => {

    return (
        <div className={"row2"}>
            <div className={"info-container"}>
                <div className={"balance-chart-wrapper"}>
                    {renderLineChart(balanceHistory)}
                </div>
                <div className={"investments-wrapper"}>
                    <InvestmentCards choicesToProcess={completedUserInvestments} areFinalized={true}/>
                </div>
                <div className={"investments-wrapper"}>
                    <InvestmentCards choicesToProcess={liveUserInvestments} areFinalized={false}/>
                </div>
            </div>
        </div>
    )
}