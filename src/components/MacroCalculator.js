import React, { useState } from 'react';

function MacroCalculator() {
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("male");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [activityLevel, setActivityLevel] = useState("sedentary");
    const [goal, setGoal] = useState("maintain");
    const [unitSystem, setUnitSystem] = useState("us");
    const [macros, setMacros] = useState(null);

    const calculateMacros = () => {
        // Convert height from inches to centimeters if metric
        const heightInCentimeters =
            unitSystem === "metric" ? (height * 2.54).toFixed(2) : height;

        // Convert weight from pounds to kilograms if metric
        const weightInKilograms =
            unitSystem === "metric" ? (weight * 0.453592).toFixed(2) : weight;

        // Calculate BMR (Basal Metabolic Rate)
        let bmr = 0;
        if (gender === "male") {
            bmr =
                10 * weightInKilograms +
                6.25 * heightInCentimeters -
                5 * age +
                5;
        } else {
            bmr =
                10 * weightInKilograms +
                6.25 * heightInCentimeters -
                5 * age -
                161;
        }

        // Adjust BMR based on activity level
        let tdee = 0;
        switch (activityLevel) {
            case "sedentary":
                tdee = bmr * 1.2;
                break;
            case "lightlyActive":
                tdee = bmr * 1.375;
                break;
            case "moderatelyActive":
                tdee = bmr * 1.55;
                break;
            case "veryActive":
                tdee = bmr * 1.725;
                break;
            case "extraActive":
                tdee = bmr * 1.9;
                break;
            default:
                tdee = bmr * 1.2;
        }

        // Adjust TDEE based on goal
        let calories = 0;
        switch (goal) {
            case "lose":
                calories = tdee - 500;
                break;
            case "gain":
                calories = tdee + 500;
                break;
            default:
                calories = tdee;
        }

        // Calculate macronutrients (Protein, Fat, Carbs)
        const protein = (weightInKilograms * 2.20462 * 0.8).toFixed(2); // 0.8 grams per pound of body weight
        const fat = ((calories * 0.25) / 9).toFixed(2); // 25% of calories from fat
        const carbs = ((calories - protein * 4 - fat * 9) / 4).toFixed(2); // Remaining calories from carbs

        // Sample values for sugar, saturated fat, and food energy (calories)
        const sugar = ((calories * 0.1) / 4).toFixed(2); // 10% of calories from sugar
        const saturatedFat = ((calories * 0.15) / 9).toFixed(2); // 15% of calories from saturated fat
        const foodEnergy = calories; // Total calories

        return {
            protein,
            fat,
            carbs,
            sugar,
            saturatedFat,
            foodEnergy,
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const calculatedMacros = calculateMacros();
        setMacros(calculatedMacros);
    };

    const toggleUnitSystem = () => {
        setUnitSystem(unitSystem === "us" ? "metric" : "us");
    };

    return (
        <div>
            <h2>Macro Calculator</h2>
            <div>
                <button onClick={toggleUnitSystem}>Toggle Unit System</button>
                <h3>{unitSystem === "us" ? "US Units" : "Metric Units"}</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Age:</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Gender:</label>
                        <select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            required
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
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
                    <div>
                        <label>Your Goal:</label>
                        <select
                            value={goal}
                            onChange={(e) => setGoal(e.target.value)}
                            required
                        >
                            <option value="maintain">Maintain Weight</option>
                            <option value="lose">Lose Weight</option>
                            <option value="gain">Gain Weight</option>
                        </select>
                    </div>
                    <button type="submit">Calculate</button>
                </form>
            </div>
            {macros && (
                <div>
                    <h3>Calculated Macros</h3>
                    <p>Protein: {macros.protein} g</p>
                    <p>Fat: {macros.fat} g</p>
                    <p>Carbs: {macros.carbs} g</p>
                    <p>Sugar: {macros.sugar} g</p>
                    <p>Saturated Fat: {macros.saturatedFat} g</p>
                    <p>Food Energy: {macros.foodEnergy} kcal</p>
                </div>
            )}
        </div>
    );
}

export default MacroCalculator;

