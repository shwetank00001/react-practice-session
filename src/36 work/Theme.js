import React from "react";

const Theme = () => {
    const [color, setColor] = React.useState("yellow");

    function toBLue() {
        setColor("blue");
    }
    function toRed() {
        setColor("red");
    }
    function toGreen() {
        setColor("green");
    }
    return (
        <div style={{ backgroundColor: color }}>
            <button onClick={toBLue}>BLue</button>
            <button onClick={toRed}>Red</button>
            <button onClick={toGreen}>Green</button>
        </div>
    );
};

export default Theme;
