import React, {useEffect, useState} from "react";
const BaseURL = "http://localhost:8000";
export default function TestStock(){
    const [status, setStatus] = useState("idle");
    const [stockPrices, setStockPrices] = useState([]);

    const formatPrice = (price) => {
        return new Intl.NumberFormat("us-EN", {
            style: "currency",
            currency: "USD",
            currencyDisplay: "narrowSymbol",
        }).format(price);
    };
    const fetchStockPrice = () => {
        setStatus("idle");
        fetch(`${BaseURL}/stocks`, { method: "GET" })
            .then((res) => (res.status === 200 ? res.json() : setStatus("rejected")))
            .then((result) => setStockPrices(result.data))
            .catch((err) => setStatus("rejected"));
    };
    const updateStockPrices = (data) => {
        const parsedData = JSON.parse(data);
        setStockPrices((stockPrices) =>
            [...stockPrices].map((stock) => {
                if (stock.id === parsedData.id) {
                    return parsedData;
                }
                return stock;
            })
        );
    };
    useEffect(() => {
        fetchStockPrice();
        const eventSource = new EventSource(`${BaseURL}/realtime-price`);
        eventSource.onmessage = (e) => updateStockPrices(e.data);
        return () => {
            eventSource.close();
        };
    }, []);

    return (
        <div className={"card"}>
            <table>
                <caption>Stock Prices</caption>
                <thead>
                <tr>
                    <th>S/N</th>
                    <th>Ticker Symbol</th>
                    <th>Real Time Price</th>
                </tr>
                </thead>
                <tbody>
                {stockPrices.map(({ id, ticker, price }, index) => (
                    <tr key={id}>
                        <td>{index + 1}</td>
                        <td>{ticker}</td>
                        <td>{formatPrice(price)}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}