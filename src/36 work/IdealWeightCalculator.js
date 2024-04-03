import React, { useState } from "react";

function IdealWeightCalculator() {
    const [gender, setGender] = useState("male");
    const [unitSystem, setUnitSystem] = useState("metric");
    const [heightFeet, setHeightFeet] = useState("");
    const [heightInches, setHeightInches] = useState("");
    const [heightCm, setHeightCm] = useState("");
    const [weightKg, setWeightKg] = useState("");
    const [weightLbs, setWeightLbs] = useState("");
    const [age, setAge] = useState("");
    const [result, setResult] = useState("");

    const calculateIdealWeight = () => {
        let idealWeight;
        if (unitSystem === "metric") {
            if (gender === "male") {
                idealWeight = (parseFloat(heightCm) - 100) * 0.9;
            } else {
                idealWeight = (parseFloat(heightCm) - 100) * 0.85;
            }
        } else if (unitSystem === "us") {
            const totalInches =
                parseInt(heightFeet) * 12 + parseInt(heightInches);
            if (gender === "male") {
                idealWeight = (totalInches - 60) * 2.3 + 50;
            } else {
                idealWeight = (totalInches - 60) * 2.3 + 45.5;
            }
        }

        setResult(idealWeight.toFixed(1));
    };

    return (
        <div>
            <h2>Ideal Weight Calculator</h2>
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
            <br />
            <label>Unit System:</label>
            <select
                value={unitSystem}
                onChange={(e) => setUnitSystem(e.target.value)}
            >
                <option value="metric">Metric (cm, kg)</option>
                <option value="us">US (feet, inches, lbs)</option>
            </select>
            <br />
            {unitSystem === "metric" && (
                <>
                    <label>Height (cm):</label>
                    <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                    />
                </>
            )}
            {unitSystem === "us" && (
                <>
                    <label>Height (Feet, Inches):</label>
                    <input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        placeholder="Feet"
                    />
                    <input
                        type="number"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        placeholder="Inches"
                    />
                </>
            )}
            <br />
            <label>Weight:</label>
            {unitSystem === "metric" && (
                <input
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    placeholder="Weight (kg)"
                />
            )}
            {unitSystem === "us" && (
                <input
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(e.target.value)}
                    placeholder="Weight (lbs)"
                />
            )}
            <br />
            <label>Age:</label>
            <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Age"
            />
            <br />
            <button onClick={calculateIdealWeight}>
                Calculate Ideal Weight
            </button>
            <br />
            {result && (
                <div>
                    <h3>Ideal Weight:</h3>
                    <p>{result} kg</p>
                </div>
            )}
        </div>
    );
}

export default IdealWeightCalculator;
