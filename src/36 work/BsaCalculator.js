import React, { useState } from "react";

function BsaCalculator() {
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [unitSystem, setUnitSystem] = useState("metric");
    const [bsa, setBsa] = useState("");

    const calculateBsa = () => {
        let weightInKg, heightInCm;

        if (unitSystem === "metric") {
            weightInKg = parseFloat(weight);
            heightInCm = parseFloat(height);
        } else {
            weightInKg = parseFloat(weight) / 2.20462; // Convert lbs to kg
            heightInCm = parseFloat(height) * 2.54; // Convert inches to cm
        }

        // Calculate BSA using the Dubois formula
        const bsaValue = Math.sqrt((weightInKg * heightInCm) / 3600);
        return bsaValue.toFixed(2);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedBsa = calculateBsa();
        setBsa(calculatedBsa);
    };

    const handleUnitSystemChange = (system) => {
        setUnitSystem(system);
        setWeight("");
        setHeight("");
        setBsa("");
    };

    return (
        <div>
            <h2>Body Surface Area Calculator</h2>
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
                        Weight ({unitSystem === "metric" ? "kg" : "lbs"}):
                    </label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        required
                    />
                </div>
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
            {bsa !== "" && (
                <div>
                    <h3>Result</h3>
                    <p>
                        Body Surface Area: {bsa}{" "}
                        {unitSystem === "metric" ? "m²" : "ft²"}
                    </p>
                </div>
            )}
        </div>
    );
}

export default BsaCalculator;
