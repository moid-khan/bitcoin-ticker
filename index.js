const expres = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = expres();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  var fiatCurrency = req.body.fiat;
  var cryptoCurrency = req.body.crypto;

  var api =
    "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=" +
    cryptoCurrency +
    "&tsyms=" +
    fiatCurrency;

  var options = {
    url: "https://min-api.cryptocompare.com/data/pricemultifull",
    method: "GET",
    qs: {
      fsyms: cryptoCurrency,
      tsyms: fiatCurrency
    }
  };
  request(api, function(error, response, body) {
    var data = JSON.parse(body);
    var price = data.RAW.BTC.USD.PRICE;
    console.log(price);
    res.write(
      "<h1>The price of " +
        cryptoCurrency +
        " is " +
        price +
        " " +
        fiatCurrency +
        " <h1/>"
    );

    res.send();
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000");
});
