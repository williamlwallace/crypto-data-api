const express = require("express");
const axios = require("axios").default;
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${3000}`);
})

app.get("/crypto/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const headers = {
    "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY
  }
  
  try {
    const response = await axios({
      method: "get",
      url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest",
      headers: headers,
      params: {
        symbol: symbol.toUpperCase()
      }
    });
    console.log(response.data.data[symbol]);
    const data = {
      name: response.data.data[symbol].name,
      price: response.data.data[symbol].quote.USD.price,
      percent_change_24h: response.data.data[symbol].quote.USD.percent_change_24h,
      fully_diluted_market_cap: response.data.data[symbol].quote.USD.fully_diluted_market_cap,
      circulating_supply: response.data.data[symbol].circulating_supply,
      total_supply: response.data.data[symbol].total_supply
    }
    res.json(data);
  } catch (error) {
    console.log(error.response);
    return res.sendStatus(400);
  }
})