const billInput = document.getElementById("bill");
const sizeInput = document.getElementById("size");
const calculateBtn = document.getElementById("calculate");
const annualEl = document.getElementById("annual");
const costEl = document.getElementById("cost");
const paybackEl = document.getElementById("payback");

function money(value) {
  return "PKR " + Math.round(value).toLocaleString("en-PK");
}

function calculate() {
  const bill = Math.max(0, Number(billInput.value) || 0);
  const size = Number(sizeInput.value);
  // Simplified planning assumptions; replace with your own market data later.
  const coverage = {3: 0.45, 5: 0.65, 10: 0.85, 15: 0.95}[size];
  const annualSavings = bill * 12 * coverage;
  const estimatedCost = size * 150000;
  const payback = annualSavings > 0 ? estimatedCost / annualSavings : 0;

  annualEl.textContent = money(annualSavings);
  costEl.textContent = money(estimatedCost);
  paybackEl.textContent = payback ? payback.toFixed(1) + " years" : "—";
}

calculateBtn.addEventListener("click", calculate);
billInput.addEventListener("input", calculate);
sizeInput.addEventListener("change", calculate);
document.getElementById("year").textContent = new Date().getFullYear();
