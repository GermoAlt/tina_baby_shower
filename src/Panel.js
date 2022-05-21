import React from "react";

export default function Panel(props){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "jeffanie testing name" })
    };

    function test(){
        fetch("http://localhost:8000/registerUser", requestOptions)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return <div className={"card"}>
        <button onClick={() => test()}>button name here</button>

    </div>
}