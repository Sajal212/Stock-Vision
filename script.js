const API_KEY = "d75cv4hr01qk56kca8g0d75cv4hr01qk56kca8gg";

function searchStock() {
  let symbol = document.getElementById("stockInput").value.trim().toUpperCase();

  document.getElementById("stockResult").innerHTML = "⏳ Loading...";

  fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      // Finnhub returns 0 if invalid
      if (data.c === 0) {
        document.getElementById("stockResult").innerHTML =
          "❌ Stock not found. Try AAPL or TSLA.";
        return;
      }

      let change = data.dp;

      document.getElementById("stockResult").innerHTML = `
        <div class="stock-card">
          <h3>${symbol}</h3>
          <p>Price: $${data.c}</p>
          <p class="${change < 0 ? 'red' : 'green'}">
            ${change}%
          </p>
          <button onclick="addToWatchlist('${symbol}')">
            ⭐ Add to Watchlist
          </button>
        </div>
      `;
    })
    .catch(() => {
      document.getElementById("stockResult").innerHTML =
        "⚠️ Error fetching stock data.";
    });
}