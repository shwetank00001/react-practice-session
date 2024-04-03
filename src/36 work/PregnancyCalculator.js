import React, { useState } from "react";

function PregnancyCalculator() {
    const [method, setMethod] = useState("lmp");
    const [cycleLength, setCycleLength] = useState("");
    const [date, setDate] = useState("");
    const [estimatedDueDate, setEstimatedDueDate] = useState("");
    const [trimester, setTrimester] = useState("");

    const calculateDueDate = () => {
        if (method === "lmp" && cycleLength && date) {
            const lmpDate = new Date(date);
            const adjustedCycleLength = parseInt(cycleLength) - 28;
            lmpDate.setDate(lmpDate.getDate() + adjustedCycleLength);
            const dueDate = new Date(lmpDate.setDate(lmpDate.getDate() + 280));
            setEstimatedDueDate(dueDate.toDateString());
            setTrimester(getTrimester(dueDate));
        } else if (method === "conception" && date) {
            const conceptionDate = new Date(date);
            const dueDate = new Date(
                conceptionDate.setDate(conceptionDate.getDate() + 266)
            );
            setEstimatedDueDate(dueDate.toDateString());
            setTrimester(getTrimester(dueDate));
        } else if (method === "fpl" && cycleLength && date) {
            const fplDate = new Date(date);
            const adjustedCycleLength = parseInt(cycleLength) - 28;
            fplDate.setDate(fplDate.getDate() - adjustedCycleLength);
            const dueDate = new Date(fplDate.setDate(fplDate.getDate() + 280));
            setEstimatedDueDate(dueDate.toDateString());
            setTrimester(getTrimester(dueDate));
        } else if (method === "ivf" && date) {
            const ivfDate = new Date(date);
            const dueDate = new Date(ivfDate.setDate(ivfDate.getDate() + 266));
            setEstimatedDueDate(dueDate.toDateString());
            setTrimester(getTrimester(dueDate));
        } else if (method === "ultrasound" && date) {
            const ultrasoundDate = new Date(date);
            const dueDate = new Date(
                ultrasoundDate.setDate(ultrasoundDate.getDate() + 280)
            );
            setEstimatedDueDate(dueDate.toDateString());
            setTrimester(getTrimester(dueDate));
        }
    };

    const getTrimester = (dueDate) => {
        const currentDate = new Date();
        const weeksPregnant = Math.floor(
            (currentDate - dueDate) / (1000 * 60 * 60 * 24 * 7)
        );
        if (weeksPregnant < 13) {
            return "1st Trimester";
        } else if (weeksPregnant >= 13 && weeksPregnant < 27) {
            return "2nd Trimester";
        } else {
            return "3rd Trimester";
        }
    };

    return (
        <div>
            <h2>Pregnancy Calculator</h2>
            <label>Calculation Method:</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="lmp">Last Menstrual Period (LMP)</option>
                <option value="conception">Conception Date</option>
                <option value="fpl">First Day of Last Period (FPL)</option>
                <option value="ivf">IVF Transfer Date</option>
                <option value="ultrasound">Ultrasound Date</option>
            </select>
            <br />
            {(method === "lmp" || method === "fpl") && (
                <div>
                    <label>Cycle Length (in days):</label>
                    <input
                        type="number"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(e.target.value)}
                    />
                </div>
            )}
            <label>Date:</label>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <br />
            <button onClick={calculateDueDate}>Calculate Due Date</button>
            <br />
            {estimatedDueDate && (
                <div>
                    <h3>Estimated Due Date:</h3>
                    <p>{estimatedDueDate}</p>
                    <h3>Trimester:</h3>
                    <p>{trimester}</p>
                </div>
            )}
        </div>
    );
}

export default PregnancyCalculator;
