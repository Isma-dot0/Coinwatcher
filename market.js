
document.addEventListener("DOMContentLoaded", () => {
    const cryptoTable = document.getElementById('crypto-table');
    const apiUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            cryptoTable.innerHTML = data.map(crypto => `
                <tr>
                    <td>${crypto.name}</td>
                    <td>${crypto.symbol.toUpperCase()}</td>
                    <td>$${crypto.current_price.toFixed(2)}</td>
                    <td><button onclick="addToPortfolio('${crypto.name}', ${crypto.current_price})">Add</button></td>
                </tr>
            `).join('');
        });
});

function addToPortfolio(name, value) {
    fetch('http://127.0.0.1:5000/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, holdings: 1, value })
    }).then(() => alert(`${name} added to portfolio!`));
}
