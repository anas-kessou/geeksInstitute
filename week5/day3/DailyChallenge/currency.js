const fromSelect = document.getElementById('fromCurrency');
const toSelect = document.getElementById('toCurrency');
const amountInput = document.getElementById('amount');
const resultEl = document.getElementById('result');
const convertBtn = document.getElementById('convertBtn');
const switchBtn = document.getElementById('switchBtn');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');

const API_KEY = "23b86c7661854d7fedb3f8fd"; 

// Load all currency codes
async function loadCurrencies() {
  loadingEl.classList.remove('hidden');
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/codes`);
    const data = await response.json();

    if (data.result !== "success") throw new Error("Failed to load currencies");

    const codes = data.supported_codes;

    codes.forEach(([code, name]) => {
      const option1 = document.createElement('option');
      option1.value = code;
      option1.textContent = `${code}`;
      fromSelect.appendChild(option1);

      const option2 = option1.cloneNode(true);
      toSelect.appendChild(option2);
    });

    fromSelect.value = "USD";
    toSelect.value = "EUR";
  } catch (error) {
    errorEl.textContent = "⚠️ Failed to load currencies!";
    errorEl.classList.remove('hidden');
  } finally {
    loadingEl.classList.add('hidden');
  }
}

async function convertCurrency() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const amount = amountInput.value;

  if (!amount) return alert("Enter an amount!");

  loadingEl.classList.remove('hidden');
  resultEl.textContent = "";
  errorEl.classList.add('hidden');

  try {
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${from}/${to}/${amount}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result !== "success") throw new Error("Conversion failed");

    const converted = data.conversion_result;
    resultEl.textContent = `${amount} ${from} = ${converted.toFixed(2)} ${to}`;
  } catch (error) {
    errorEl.textContent = "⚠️ Error during conversion!";
    errorEl.classList.remove('hidden');
  } finally {
    loadingEl.classList.add('hidden');
  }
}

function switchCurrencies() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  convertCurrency();
}

convertBtn.addEventListener('click', convertCurrency);
switchBtn.addEventListener('click', switchCurrencies);
loadCurrencies();