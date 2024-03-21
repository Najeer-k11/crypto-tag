async function fetchMarketCapDataAndPopulateTable(table) { // Replace 'YOUR_API_KEY' with your actual API key
    const url = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=20&CMC_PRO_API_KEY=cc99ef77-1ee7-4713-87b5-e424aabc1fcb';
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    try {
        const response = await fetch(proxyUrl + url);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const cryptocurrencies = responseData.data;

        // Clear existing table content
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }

        // Populate table with cryptocurrency data
        cryptocurrencies.forEach(crypto => {
            const row = document.createElement('tr');
            const rowData = [
                crypto.name,
                crypto.symbol,
                `$${crypto.quote.USD.price.toFixed(2)}`,
                `$${crypto.quote.USD.market_cap.toFixed(2)}`,
                `$${crypto.quote.USD.volume_24h.toFixed(2)}`,
                `${crypto.circulating_supply.toFixed(0)} ${crypto.symbol}`
            ];
            rowData.forEach(cellData => {
                const cell = document.createElement('td');
                cell.textContent = cellData;
                row.appendChild(cell);
            });
            table.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Example usage:
const tableElement = document.getElementById('tb');

window.onload = function (){
    fetchMarketCapDataAndPopulateTable(tableElement);
}
