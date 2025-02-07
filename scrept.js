

 const fromCurrency = document.getElementById("fromCurrency");
 const toCurrency = document.getElementById("toCurrency");
 const amountInput = document.getElementById("amount");
 const exchangeRateText = document.querySelector(".answer");
 const convertButton = document.getElementById("convert");
 
 function populateDropdowns() {
     for (let currency in countryList) {
         let option1 = document.createElement("option");
         let option2 = document.createElement("option");
         option1.value = currency;
         option1.innerText = currency;
         option2.value = currency;
         option2.innerText = currency;

         if (currency === "USD") option1.selected = true;
         if (currency === "INR") option2.selected = true;

         fromCurrency.appendChild(option1);
         toCurrency.appendChild(option2);
     }
 }
 
 async function fetchExchangeRate() {
     let amount = amountInput.value;
     if (amount === "" || isNaN(amount)) {
         alert("Please enter a valid amount");
         return;
     }

     let from = fromCurrency.value.toLowerCase();
     let to = toCurrency.value.toLowerCase();
     
     try {
         let response = await fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${from}.json`);
         let data = await response.json();
         let exchangeRate = data[from][to];
         let convertedAmount = (amount * exchangeRate).toFixed(2);

         exchangeRateText.innerText = `${amount} ${from.toUpperCase()} = ${convertedAmount} ${to.toUpperCase()}`;
     } catch (error) {
         exchangeRateText.innerText = "Error fetching exchange rate";
         console.error("Error fetching exchange rate:", error);
     }
 }
 
 convertButton.addEventListener("click", (event) => {
     event.preventDefault();
     fetchExchangeRate();
 });

 document.querySelectorAll("select").forEach((select) => {
     select.addEventListener("change", (event) => {
         let currencyCode = event.target.value;
         let countryCode = countryList[currencyCode];
         let img = event.target.parentElement.querySelector("img");
         img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
     });
 });

 populateDropdowns();
