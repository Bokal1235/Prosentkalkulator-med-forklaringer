const typeSelect = document.getElementById("type");
const inputsDiv = document.getElementById("inputs");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
const answerP = document.getElementById("answer");
const explanationP = document.getElementById("explanation");

// Tegn input-felter basert på valgt type
function renderInputs() {
  const type = typeSelect.value;

  if (type === "partOfWhole") {
    inputsDiv.innerHTML = `
      <label for="percentValue">Hvor mange prosent?</label>
      <input id="percentValue" type="number" placeholder="f.eks. 30">

      <label for="baseValue">Av hvilket tall?</label>
      <input id="baseValue" type="number" placeholder="f.eks. 250">
    `;
  } else if (type === "increase") {
    inputsDiv.innerHTML = `
      <label for="baseValue">Startverdi</label>
      <input id="baseValue" type="number" placeholder="f.eks. 500">

      <label for="percentValue">Hvor mange prosent økning?</label>
      <input id="percentValue" type="number" placeholder="f.eks. 12">
    `;
  } else if (type === "decrease") {
    inputsDiv.innerHTML = `
      <label for="baseValue">Startverdi</label>
      <input id="baseValue" type="number" placeholder="f.eks. 800">

      <label for="percentValue">Hvor mange prosent nedgang?</label>
      <input id="percentValue" type="number" placeholder="f.eks. 20">
    `;
  }
}

// Kjør én gang ved oppstart
renderInputs();

// Bytt inputs når brukeren endrer type
typeSelect.addEventListener("change", renderInputs);

// Hovedfunksjon for beregning
calculateBtn.addEventListener("click", () => {
  const type = typeSelect.value;
  const baseInput = document.getElementById("baseValue");
  const percentInput = document.getElementById("percentValue");

  const base = Number(baseInput.value);
  const percent = Number(percentInput.value);

  if (isNaN(base) || isNaN(percent)) {
    answerP.textContent = "Vennligst skriv inn gyldige tall.";
    explanationP.textContent = "";
    resultDiv.classList.remove("hidden");
    return;
  }

  if (type === "partOfWhole") {
    const result = (percent / 100) * base;

    answerP.textContent = `${percent} % av ${base} er ${result}.`;
    explanationP.textContent =
      `1. Gjør prosenten om til et desimaltall: ${percent} % = ${percent} / 100 = ${percent / 100}.
2. Multipliser dette med tallet: ${percent / 100} × ${base} = ${result}.
3. Derfor er ${percent} % av ${base} lik ${result}.`;
  }

  if (type === "increase") {
    const change = (percent / 100) * base;
    const newValue = base + change;

    answerP.textContent =
      `${percent} % økning av ${base} gir ny verdi ${newValue}.`;
    explanationP.textContent =
      `1. Finn ${percent} % av ${base}: ${percent} / 100 × ${base} = ${change}.
2. Legg til økningen: ${base} + ${change} = ${newValue}.
3. Den nye verdien etter ${percent} % økning er ${newValue}.`;
  }

  if (type === "decrease") {
    const change = (percent / 100) * base;
    const newValue = base - change;

    answerP.textContent =
      `${percent} % nedgang fra ${base} gir ny verdi ${newValue}.`;
    explanationP.textContent =
      `1. Finn ${percent} % av ${base}: ${percent} / 100 × ${base} = ${change}.
2. Trekk fra nedgangen: ${base} − ${change} = ${newValue}.
3. Den nye verdien etter ${percent} % nedgang er ${newValue}.`;
  }

  resultDiv.classList.remove("hidden");
});
