import React, { useState } from "react";

function PregnancyConceptionCalculator() {
    const [method, setMethod] = useState("dueDate");
    const [date, setDate] = useState("");
    const [estimatedDueDate, setEstimatedDueDate] = useState("");
    const [weeksPregnant, setWeeksPregnant] = useState("");

    const calculateDueDate = () => {
        if (date) {
            const selectedDate = new Date(date);

            if (method === "dueDate") {
                const dueDate = new Date(
                    selectedDate.setDate(selectedDate.getDate() - 266)
                );
                setEstimatedDueDate(dueDate.toDateString());
            } else if (method === "lastPeriod") {
                const dueDate = new Date(
                    selectedDate.setDate(selectedDate.getDate() + 280)
                );
                setEstimatedDueDate(dueDate.toDateString());
            } else if (method === "ultrasound") {
                const dueDate = new Date(
                    selectedDate.setDate(selectedDate.getDate() + 266)
                );
                setEstimatedDueDate(dueDate.toDateString());
            }

            // Calculate weeks pregnant based on current date and estimated due date
            const currentDate = new Date();
            const weeks = Math.floor(
                (currentDate - selectedDate) / (1000 * 60 * 60 * 24 * 7)
            );
            setWeeksPregnant(weeks);
        } else {
            setEstimatedDueDate("");
            setWeeksPregnant("");
        }
    };

    return (
        <div>
            <h2>Pregnancy Conception Calculator</h2>
            <label>Calculation Method:</label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
                <option value="dueDate">Due Date</option>
                <option value="lastPeriod">Last Menstrual Period (LMP)</option>
                <option value="ultrasound">Ultrasound Date</option>
            </select>
            <br />
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
                    <h3>Weeks Pregnant:</h3>
                    <p>{weeksPregnant}</p>
                </div>
            )}
        </div>
    );
}

export default PregnancyConceptionCalculator;
