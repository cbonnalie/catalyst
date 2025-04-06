import {useState} from "react";

export const useGameProgress = () => {
    const [currentEventIndex, setCurrentEventIndex] = useState<number>(0);
    const [currentQuarter, setCurrentQuarter] = useState<number>(1);
    const [currentYear, setCurrentYear] = useState<number>(1);

    const advanceTurn = () => {
        setCurrentEventIndex((prev) => prev + 1);
        setCurrentQuarter((prev) => (prev % 4) + 1);
        setCurrentYear((prev) => (currentQuarter === 4 ? prev + 1 : prev));
    }

    return {
        currentEventIndex,
        currentQuarter,
        currentYear,
        advanceTurn,
    }
}