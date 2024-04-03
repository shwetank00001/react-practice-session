import React, { useState } from 'react';

function PaceCalculator() {
    const [calculationType, setCalculationType] = useState("pace");
    const [distance, setDistance] = useState("");
    const [hours, setHours] = useState("");
    const [minutes, setMinutes] = useState("");
    const [seconds, setSeconds] = useState("");
    const [paceHours, setPaceHours] = useState("");
    const [paceMinutes, setPaceMinutes] = useState("");
    const [paceSeconds, setPaceSeconds] = useState("");
    const [result, setResult] = useState("");
    const [unitSystem, setUnitSystem] = useState("miles");
    const [metricSystem, setMetricSystem] = useState("minutesMile");

    const calculatePace = () => {
        const totalSeconds =
            parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        const distanceFloat = parseFloat(distance);

        if (totalSeconds && distanceFloat) {
            let pace = totalSeconds / distanceFloat;

            if (unitSystem === "kilometers") {
                pace *= 0.621371; // Convert pace to minutes per mile
            }

            const paceMinutes = Math.floor(pace / 60);
            const paceSeconds = Math.floor(pace % 60);
            const paceHours = Math.floor(paceMinutes / 60);

            setPaceHours(paceHours);
            setPaceMinutes(paceMinutes % 60);
            setPaceSeconds(paceSeconds);

            if (metricSystem === "minutesKilometer") {
                setResult(`${paceMinutes}m ${paceSeconds}s per kilometer`);
            } else {
                setResult(
                    `${paceHours}h ${paceMinutes}m ${paceSeconds}s per mile`
                );
            }
        } else {
            setResult("Please fill in all fields correctly.");
        }
    };

    const calculateDistance = () => {
        const totalSeconds =
            parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseInt(seconds);
        const timeFloat = totalSeconds / 3600;

        if (timeFloat && distance) {
            let distanceFloat = parseFloat(distance);

            if (unitSystem === "kilometers") {
                distanceFloat *= 0.621371; // Convert distance to miles
            }

            const distanceResult = timeFloat * distanceFloat;

            if (unitSystem === "kilometers") {
                setResult(`${distanceResult.toFixed(2)} kilometers`);
            } else {
                setResult(`${distanceResult.toFixed(2)} miles`);
            }
        } else {
            setResult("Please fill in all fields correctly.");
        }
    };

    const calculateTime = () => {
        const distanceFloat = parseFloat(distance);

        if (distanceFloat && paceHours && paceMinutes && paceSeconds) {
            let paceTotalSeconds =
                parseInt(paceHours) * 3600 +
                parseInt(paceMinutes) * 60 +
                parseInt(paceSeconds);
            let totalTimeSeconds = paceTotalSeconds * distanceFloat;

            if (unitSystem === "kilometers") {
                totalTimeSeconds *= 0.621371; // Convert total time to minutes per mile
            }

            const timeHours = Math.floor(totalTimeSeconds / 3600);
            const timeMinutes = Math.floor((totalTimeSeconds % 3600) / 60);
            const timeSeconds = Math.floor(totalTimeSeconds % 60);

            setResult(`${timeHours}h ${timeMinutes}m ${timeSeconds}s`);
        } else {
            setResult("Please fill in all fields correctly.");
        }
    };

    return (
        <div>
            <h2>Pace Calculator</h2>
            <div>
                <button onClick={() => setCalculationType("pace")}>Pace</button>
                <button onClick={() => setCalculationType("distance")}>
                    Distance
                </button>
                <button onClick={() => setCalculationType("time")}>Time</button>
            </div>
            {calculationType === "pace" && (
                <div>
                    <h3>Pace Calculation</h3>
                    <label>
                        Distance (
                        {unitSystem === "miles" ? "miles" : "kilometers"}):
                    </label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                    />
                    <br />
                    <label>Time (hours, minutes, seconds):</label>
                    <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="Hours"
                    />
                    <input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        placeholder="Minutes"
                    />
                    <input
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        placeholder="Seconds"
                    />
                    <br />
                    <button onClick={calculatePace}>Calculate Pace</button>
                    <br />
                    <label>Unit System:</label>
                    <select
                        value={unitSystem}
                        onChange={(e) => setUnitSystem(e.target.value)}
                    >
                        <option value="miles">Miles</option>
                        <option value="kilometers">Kilometers</option>
                    </select>
                    <br />
                    <label>Metric System:</label>
                    <select
                        value={metricSystem}
                        onChange={(e) => setMetricSystem(e.target.value)}
                    >
                        <option value="minutesMile">Minutes per Mile</option>
                        <option value="minutesKilometer">
                            Minutes per Kilometer
                        </option>
                    </select>
                </div>
            )}
            {calculationType === "distance" && (
                <div>
                    <h3>Distance Calculation</h3>
                    <label>Time (hours, minutes, seconds):</label>
                    <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        placeholder="Hours"
                    />
                    <input
                        type="number"
                        value={minutes}
                        onChange={(e) => setMinutes(e.target.value)}
                        placeholder="Minutes"
                    />
                    <input
                        type="number"
                        value={seconds}
                        onChange={(e) => setSeconds(e.target.value)}
                        placeholder="Seconds"
                    />
                    <br />
                    <label>Pace (hours, minutes, seconds):</label>
                    <input
                        type="number"
                        value={paceHours}
                        onChange={(e) => setPaceHours(e.target.value)}
                        placeholder="Hours"
                    />
                    <input
                        type="number"
                        value={paceMinutes}
                        onChange={(e) => setPaceMinutes(e.target.value)}
                        placeholder="Minutes"
                    />
                    <input
                        type="number"
                        value={paceSeconds}
                        onChange={(e) => setPaceSeconds(e.target.value)}
                        placeholder="Seconds"
                    />
                    <br />
                    <button onClick={calculateDistance}>
                        Calculate Distance
                    </button>
                    <br />
                    <label>Unit System:</label>
                    <select
                        value={unitSystem}
                        onChange={(e) => setUnitSystem(e.target.value)}
                    >
                        <option value="miles">Miles</option>
                        <option value="kilometers">Kilometers</option>
                    </select>
                </div>
            )}
            {calculationType === "time" && (
                <div>
                    <h3>Time Calculation</h3>
                    <label>Pace (hours, minutes, seconds):</label>
                    <input
                        type="number"
                        value={paceHours}
                        onChange={(e) => setPaceHours(e.target.value)}
                        placeholder="Hours"
                    />
                    <input
                        type="number"
                        value={paceMinutes}
                        onChange={(e) => setPaceMinutes(e.target.value)}
                        placeholder="Minutes"
                    />
                    <input
                        type="number"
                        value={paceSeconds}
                        onChange={(e) => setPaceSeconds(e.target.value)}
                        placeholder="Seconds"
                    />
                    <br />
                    <label>
                        Distance (
                        {unitSystem === "miles" ? "miles" : "kilometers"}):
                    </label>
                    <input
                        type="number"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                    />
                    <br />
                    <button onClick={calculateTime}>Calculate Time</button>
                    <br />
                    <label>Unit System:</label>
                    <select
                        value={unitSystem}
                        onChange={(e) => setUnitSystem(e.target.value)}
                    >
                        <option value="miles">Miles</option>
                        <option value="kilometers">Kilometers</option>
                    </select>
                </div>
            )}
            {result && (
                <div>
                    <h3>Result:</h3>
                    <p>{result}</p>
                </div>
            )}
        </div>
    );
}

export default PaceCalculator;

