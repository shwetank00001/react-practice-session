import React, { useState } from "react";

function FatIntakeCalculator() {
    const [weight, setWeight] = useState("");
    const [goal, setGoal] = useState("lose");
    const [unitSystem, setUnitSystem] = useState("us");
    const [activityLevel, setActivityLevel] = useState("sedentary");
    const [dailyFatAllowance, setDailyFatAllowance] = useState("");
    const [saturatedFatAllowance, setSaturatedFatAllowance] = useState("");
    const [satFatReducedAllowance, setSatFatReducedAllowance] = useState("");

    const calculateCalories = () => {
        const weightInKg = unitSystem === "metric" ? weight : weight / 2.205; // Convert lbs to kg if us

        let bmr = 0;
        if (activityLevel === "sedentary") {
            bmr = 1.2 * (weightInKg * 24);
        } else if (activityLevel === "lightlyActive") {
            bmr = 1.375 * (weightInKg * 24);
        } else if (activityLevel === "moderatelyActive") {
            bmr = 1.55 * (weightInKg * 24);
        } else if (activityLevel === "veryActive") {
            bmr = 1.725 * (weightInKg * 24);
        } else if (activityLevel === "extraActive") {
            bmr = 1.9 * (weightInKg * 24);
        }

        const fatGoalPercentage = goal === "lose" ? 0.2 : 0.35;
        const dailyCalories = bmr + 500 * (goal === "gain" ? 1 : -1);
        const dailyFatAllowanceValue = dailyCalories * fatGoalPercentage;
        const saturatedFatAllowanceValue = dailyCalories * 0.1;
        const satFatReducedAllowanceValue = dailyCalories * 0.07;

        return {
            dailyCalories: dailyCalories.toFixed(2),
            dailyFatAllowance: dailyFatAllowanceValue.toFixed(2),
            saturatedFatAllowance: saturatedFatAllowanceValue.toFixed(2),
            satFatReducedAllowance: satFatReducedAllowanceValue.toFixed(2),
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedCalories = calculateCalories();
        setDailyFatAllowance(calculatedCalories.dailyFatAllowance);
        setSaturatedFatAllowance(calculatedCalories.saturatedFatAllowance);
        setSatFatReducedAllowance(calculatedCalories.satFatReducedAllowance);
    };

    const toggleUnitSystem = () => {
        setUnitSystem(unitSystem === "us" ? "metric" : "us");
    };

    return (
        <div>
            <h2>Fat Intake Calculator</h2>
            <div>
                <button onClick={toggleUnitSystem}>Toggle Unit System</button>
                <h3>{unitSystem === "us" ? "US Units" : "Metric Units"}</h3>
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
                        <label>Goal:</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            required
                        >
                            <option value="lose">Lose Weight</option>
                            <option value="maintain">Maintain Weight</option>
                            <option value="gain">Gain Weight</option>
                        </select>
                    </div>
                    <div>
                        <label>Activity Level:</label>
                        <select
                            value={activityLevel}
                            onChange={(e) => setActivityLevel(e.target.value)}
                            required
                        >
                            <option value="sedentary">
                                Sedentary (little or no exercise)
                            </option>
                            <option value="lightlyActive">
                                Lightly active (light exercise/sports 1-3
                                days/week)
                            </option>
                            <option value="moderatelyActive">
                                Moderately active (moderate exercise/sports 3-5
                                days/week)
                            </option>
                            <option value="veryActive">
                                Very active (hard exercise/sports 6-7 days a
                                week)
                            </option>
                            <option value="extraActive">
                                Extra active (very hard exercise/sports &
                                physical job or 2x training)
                            </option>
                        </select>
                    </div>
                    <button type="submit">Calculate</button>
                </form>
            </div>
            {dailyFatAllowance && (
                <div>
                    <h3>Calculated Daily Fat Intake Allowance</h3>
                    <p>Daily Calorie Allowance: {dailyFatAllowance} kcal</p>
                    <p>Daily Fat Allowance: {dailyFatAllowance} kcal</p>
                    <p>Saturated Fat Allowance: {saturatedFatAllowance} kcal</p>
                    <p>
                        Saturated Fat Allowance to Help Reduce Heart Disease:{" "}
                        {satFatReducedAllowance} kcal
                    </p>
                </div>
            )}
        </div>
    );
}

export default FatIntakeCalculator;
