import React, { useState } from "react";

function BodyTypeCalculator() {
    const [waist, setWaist] = useState("");
    const [hip, setHip] = useState("");
    const [height, setHeight] = useState("");
    const [unitSystem, setUnitSystem] = useState("us");
    const [bodyFatPercentage, setBodyFatPercentage] = useState("");
    const [bodyType, setBodyType] = useState("");

    const calculateBodyFatPercentage = () => {
        let bodyFatPercentageValue;

        if (unitSystem === "us") {
            const waistInCm = parseFloat(waist) * 2.54;
            const hipInCm = parseFloat(hip) * 2.54;
            const heightInCm = parseFloat(height) * 2.54;

            bodyFatPercentageValue = (
                495 /
                    (1.0324 -
                        0.19077 * Math.log10(waistInCm - hipInCm) +
                        0.15456 * Math.log10(heightInCm)) -
                450
            ).toFixed(2);
        } else {
            const waistInCm = parseFloat(waist);
            const hipInCm = parseFloat(hip);
            const heightInCm = parseFloat(height);

            bodyFatPercentageValue = (
                495 /
                    (1.0324 -
                        0.19077 * Math.log10(waistInCm - hipInCm) +
                        0.15456 * Math.log10(heightInCm)) -
                450
            ).toFixed(2);
        }

        return bodyFatPercentageValue;
    };

    const determineBodyType = () => {
        const bfPercentage = parseFloat(bodyFatPercentage);

        if (bfPercentage < 8) {
            return "Essential Fat";
        } else if (bfPercentage >= 8 && bfPercentage < 20) {
            return "Athletes";
        } else if (bfPercentage >= 20 && bfPercentage < 24) {
            return "Fitness";
        } else if (bfPercentage >= 24 && bfPercentage < 31) {
            return "Average";
        } else {
            return "Obese";
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedBodyFatPercentage = calculateBodyFatPercentage();
        setBodyFatPercentage(calculatedBodyFatPercentage);
        const calculatedBodyType = determineBodyType();
        setBodyType(calculatedBodyType);
    };

    const handleUnitSystemChange = (system) => {
        setUnitSystem(system);
        setWaist("");
        setHip("");
        setHeight("");
        setBodyFatPercentage("");
        setBodyType("");
    };

    return (
        <div>
            <h2>Body Type Calculator</h2>
            <div>
                <button onClick={() => handleUnitSystemChange("us")}>
                    US Units
                </button>
                <button onClick={() => handleUnitSystemChange("metric")}>
                    Metric Units
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Waist ({unitSystem === "us" ? "in" : "cm"}):</label>
                    <input
                        type="number"
                        value={waist}
                        onChange={(e) => setWaist(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Hip ({unitSystem === "us" ? "in" : "cm"}):</label>
                    <input
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Height ({unitSystem === "us" ? "in" : "cm"}):</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Calculate</button>
            </form>
            {bodyFatPercentage !== "" && (
                <div>
                    <h3>Results</h3>
                    <p>Body Fat Percentage: {bodyFatPercentage}%</p>
                    <p>Body Type: {bodyType}</p>
                </div>
            )}
        </div>
    );
}

export default BodyTypeCalculator;
