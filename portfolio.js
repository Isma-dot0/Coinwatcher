
document.addEventListener("DOMContentLoaded", () => {
    const portfolioTable = document.getElementById('portfolio-table');
    const totalValueElement = document.getElementById('total-value');

    fetch('http://127.0.0.1:5000/portfolio')
        .then(response => response.json())
        .then(data => {
            portfolioTable.innerHTML = data.portfolio.map(item => `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.holdings}</td>
                    <td>$${item.value.toFixed(2)}</td>
                </tr>
            `).join('');
            totalValueElement.textContent = `Total Value: $${data.total_value.toFixed(2)}`;
        });
});
