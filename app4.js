document.addEventListener("DOMContentLoaded", function () {
    const apiURL = "https://api.exchangerate-api.com/v4/latest/";
    const convertBtn = document.getElementById("convertBtn");
    const fromCurrency = document.querySelector(".from select");
    const toCurrency = document.querySelector(".to select");
    const amountInput = document.querySelector(".amount input");
    const msgDiv = document.querySelector(".msg");
    const fromFlag = document.querySelector(".from img");
    const toFlag = document.querySelector(".to img");

    const currencyList = {
        "USD": "US",
        "EUR": "EU",
        "GBP": "GB",
        "INR": "IN",
        "AUD": "AU",
        "CAD": "CA",
        "JPY": "JP",
        "CNY": "CN",
        "CHF": "CH",
        "NZD": "NZ",
        "SGD": "SG",
        "HKD": "HK",
        "SEK": "SE",
        "KRW": "KR",
        "NOK": "NO",
        "MXN": "MX",
        "BRL": "BR",
        "ZAR": "ZA",
        "RUB": "RU",
        "TRY": "TR"
    };

    function populateCurrencyDropdowns() {
        Object.keys(currencyList).forEach(currency => {
            let option1 = document.createElement("option");
            option1.value = currency;
            option1.innerText = currency;
            fromCurrency.appendChild(option1);

            let option2 = document.createElement("option");
            option2.value = currency;
            option2.innerText = currency;
            toCurrency.appendChild(option2);
        });
    }

    function updateFlag(currency, flagElement) {
        flagElement.src = `https://flagsapi.com/${currencyList[currency]}/flat/64.png`;
    }

    fromCurrency.addEventListener("change", () => updateFlag(fromCurrency.value, fromFlag));
    toCurrency.addEventListener("change", () => updateFlag(toCurrency.value, toFlag));

    function convertCurrency() {
        let amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            msgDiv.innerText = "Please enter a valid amount!";
            return;
        }

        fetch(apiURL + fromCurrency.value)
            .then(response => response.json())
            .then(data => {
                let rate = data.rates[toCurrency.value];
                let convertedAmount = (amount * rate).toFixed(2);

                msgDiv.innerText = `${amount} ${fromCurrency.value} = ${convertedAmount} ${toCurrency.value}`;
            })
            .catch(error => {
                console.error("Error fetching exchange rate:", error);
                msgDiv.innerText = "Error fetching data. Try again!";
            });
    }

    convertBtn.parentElement.addEventListener("click", function (event) {
        event.preventDefault();
        convertCurrency();
    });

    populateCurrencyDropdowns();
    fromCurrency.value = "USD";
    toCurrency.value = "INR";
    updateFlag("USD", fromFlag);
    updateFlag("INR", toFlag);
});
