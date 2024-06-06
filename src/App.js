// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

export default function App() {
  return (
    <div>
      <CurrencyConversion />
    </div>
  );
}

function CurrencyConversion() {
  const [curencyInput, setCurrencyInput] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [outputValue, setOutputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getCurrencyValue() {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${curencyInput}&from=${fromCurrency}&to=${toCurrency}`
        );
        const result = await res.json();
        setOutputValue(result.rates[toCurrency]);
        setIsLoading(false);
      }
      if (fromCurrency === toCurrency) return setOutputValue(curencyInput);
      getCurrencyValue();
    },
    [curencyInput, fromCurrency, toCurrency]
  );
  return (
    <>
      {" "}
      <input
        type="text"
        value={curencyInput}
        onChange={(e) => setCurrencyInput(Number(e.target.value))}
        disabled={isLoading}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>
        {outputValue} {toCurrency}
      </p>
    </>
  );
}
