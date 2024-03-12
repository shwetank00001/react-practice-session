import React from "react";
import { useState } from "react";


const Things = () => {
    const [data, setData] = useState(["Thing 1"]);

    function addThing() {
        setData(function (item) {
            return [...item, ` Thing ${data.length + 1}`];
        });
    }
    return (
        <div >
            <h3>List of things are</h3>
            <button onClick={addThing}>Add a thing</button>
            {data}
        </div>
    );
};

export default Things;
