import React from "react";

// const baseURL = "https://tina-baby-shower-game.herokuapp.com"
const baseURL = "https://localhost:8000"

export default function Panel(props){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: "jeffanie testing name" })
    };

    function test(){
        fetch( `${baseURL}/registerUser`, requestOptions)
            .then(res => res.json())
            .then(data => console.log(data))
    }

    return <div className={"card"}>
        <button onClick={() => test()}>button name here</button>

    </div>
}