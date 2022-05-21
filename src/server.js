/*server.js*/
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json())
const PORT = 8000;
const stocks = [
    { id: 1, ticker: "AAPL", price: 497.48 },
    { id: 2, ticker: "MSFT", price: 213.02 },
    { id: 3, ticker: "AMZN", price: 3284.72 },
];

let users = []

let currentPlayerId = 0

const gameData = require("./words.json")

function getRandomStock() {
    return Math.round(Math.random() * 2);
}
function getRandomPrice() {
    return Math.random() * (5000 - 20) + 20;
}

app.post("/registerUser", function (req, res){
    users.push({name: req.body.name, id: users.length})
    res.status(200).json({success: true, userId:users.length - 1})
})

app.get("/game-data", function (req, res) {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
})

app.get("/stocks", function (req, res) {
    res.status(200).json({ success: true, data: stocks });
});

app.get("/realtime-price", function (req, res) {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
    });
    setInterval(() => {
        res.write(
            "data:" +
            JSON.stringify({ ...stocks[getRandomStock()], price: getRandomPrice() })
        );
        res.write("\n\n");
    }, 1000);
});

app.listen(PORT, function () {
    console.log(`Server is running on ${PORT}`);
});

function nextPlayer(){
    return ++currentPlayerId
}