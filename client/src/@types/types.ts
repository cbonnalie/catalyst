/**
 * Represents a game event.
 */
export interface Event {
    event_type: string
    description: string
    percent_3months: number
    percent_6months: number
    percent_1year: number
    percent_5years: number
}

/**
 * Represents a user investment.
 */
export interface Investment {
    description: string
    investment_amount: number
    time_interval: number
    time_remaining: number
    percent_change: number
    type: string
}

export interface InvestmentHistory {
    turn: string
    balance: number
}