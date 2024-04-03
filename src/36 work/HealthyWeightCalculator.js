import React, { useState } from "react";

function HealthyWeightCalculator() {
    const [unitSystem, setUnitSystem] = useState("metric");
    const [height, setHeight] = useState("");
    const [healthyWeight, setHealthyWeight] = useState("");

    const calculateHealthyWeight = () => {
        const heightInMeter =
            unitSystem === "metric"
                ? parseFloat(height) / 100
                : parseFloat(height) / 39.37;

        // Calculate healthy weight using BMI formula
        const lowerHealthyBmi = 18.5;
        const upperHealthyBmi = 24.9;
        const lowerHealthyWeight =
            lowerHealthyBmi * (heightInMeter * heightInMeter);
        const upperHealthyWeight =
            upperHealthyBmi * (heightInMeter * heightInMeter);

        // Convert to kilograms and format with two decimal places
        const lowerHealthyWeightFormatted = lowerHealthyWeight.toFixed(2);
        const upperHealthyWeightFormatted = upperHealthyWeight.toFixed(2);

        return `${lowerHealthyWeightFormatted} - ${upperHealthyWeightFormatted}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedHealthyWeight = calculateHealthyWeight();
        setHealthyWeight(calculatedHealthyWeight);
    };

    const handleUnitSystemChange = (system) => {
        setUnitSystem(system);
        setHeight("");
        setHealthyWeight("");
    };

    return (
        <div>
            <h2>Healthy Weight Calculator</h2>
            <div>
                <button onClick={() => handleUnitSystemChange("metric")}>
                    Metric Units
                </button>
                <button onClick={() => handleUnitSystemChange("us")}>
                    US Units
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Height ({unitSystem === "metric" ? "cm" : "in"}):
                    </label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>
            {healthyWeight !== "" && (
                <div>
                    <h3>Results</h3>
                    <p>Healthy Weight Range: {healthyWeight} Kg</p>
                </div>
            )}
        </div>
    );
}

export default HealthyWeightCalculator;
