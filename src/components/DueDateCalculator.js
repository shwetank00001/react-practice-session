import React, { useState } from "react";

function DueDateCalculator() {
    const [method, setMethod] = useState("LastMenstrualPeriod");
    const [lastPeriodDate, setLastPeriodDate] = useState("");
    const [cycleLength, setCycleLength] = useState("");
    const [pregnancyLength, setPregnancyLength] = useState("");
    const [conceptionDate, setConceptionDate] = useState("");
    const [ivfTransferDate, setIvfTransferDate] = useState("");
    const [dueDate, setDueDate] = useState("");

    const calculateDueDate = () => {
        let estimatedDueDate;
        if (method === "LastMenstrualPeriod") {
            const lastPeriod = new Date(lastPeriodDate);
            const cycle = parseInt(cycleLength);
            const pregnancy = parseInt(pregnancyLength);
            if (!isNaN(lastPeriod.getTime()) && cycle && pregnancy) {
                estimatedDueDate = new Date(
                    lastPeriod.getTime() +
                        (cycle + pregnancy) * 24 * 60 * 60 * 1000
                );
            } else {
                alert("Please fill in all the fields correctly.");
                return;
            }
        } else if (method === "Ultrasound") {
            const ultrasound = new Date(conceptionDate);
            if (!isNaN(ultrasound.getTime())) {
                estimatedDueDate = new Date(
                    ultrasound.getTime() + 280 * 24 * 60 * 60 * 1000
                );
            } else {
                alert("Please fill in the ultrasound date correctly.");
                return;
            }
        } else if (method === "ConceptionDate") {
            const conception = new Date(conceptionDate);
            if (!isNaN(conception.getTime())) {
                estimatedDueDate = new Date(
                    conception.getTime() + 266 * 24 * 60 * 60 * 1000
                );
            } else {
                alert("Please fill in the conception date correctly.");
                return;
            }
        } else if (method === "IVFTransferDate") {
            const ivfTransfer = new Date(ivfTransferDate);
            if (!isNaN(ivfTransfer.getTime())) {
                estimatedDueDate = new Date(
                    ivfTransfer.getTime() + 266 * 24 * 60 * 60 * 1000
                );
            } else {
                alert("Please fill in the IVF transfer date correctly.");
                return;
            }
        }

        setDueDate(estimatedDueDate.toDateString());
    };

    return (
        <div>
            <h2>Due Date Calculator</h2>
            <label>Select Calculation Method:</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="LastMenstrualPeriod">
                    Last Menstrual Period
                </option>
                <option value="Ultrasound">Ultrasound</option>
                <option value="ConceptionDate">Conception Date</option>
                <option value="IVFTransferDate">IVF Transfer Date</option>
            </select>
            {method !== "LastMenstrualPeriod" && (
                <>
                    <br />
                    <label>Date:</label>
                    <input
                        type="date"
                        value={conceptionDate}
                        onChange={(e) => setConceptionDate(e.target.value)}
                    />
                </>
            )}
            {method === "LastMenstrualPeriod" && (
                <>
                    <br />
                    <label>Last Menstrual Period Date:</label>
                    <input
                        type="date"
                        value={lastPeriodDate}
                        onChange={(e) => setLastPeriodDate(e.target.value)}
                    />
                    <br />
                    <label>Average Menstrual Cycle Length (days):</label>
                    <input
                        type="number"
                        value={cycleLength}
                        onChange={(e) => setCycleLength(e.target.value)}
                    />
                    <br />
                    <label>Average Length of Pregnancy (days):</label>
                    <input
                        type="number"
                        value={pregnancyLength}
                        onChange={(e) => setPregnancyLength(e.target.value)}
                    />
                </>
            )}
            <br />
            <button onClick={calculateDueDate}>Calculate Due Date</button>
            <br />
            {dueDate && (
                <div>
                    <h3>Estimated Due Date:</h3>
                    <p>{dueDate}</p>
                </div>
            )}
        </div>
    );
}

export default DueDateCalculator;
