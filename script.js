// Spara data
let cards = JSON.parse(localStorage.getItem("cards")) || [];

// Lägg till kort
function laggTillKort(status) {
  const titel = prompt("Korttitel:");
  const beskrivning = prompt("Kortbeskrivning:");

  if (!titel) return;

  const kort = {
    id: Date.now(),
    titel,
    beskrivning,
    status
  };

  cards.push(kort);
  sparaOchRendera();
}

// Ta bort kort
function taBortKort(id) {
  cards = cards.filter(kort => kort.id != id);
  sparaOchRendera();
}

// Spara + Rendera
function sparaOchRendera() {
  localStorage.setItem("cards", JSON.stringify(cards));
  rendera();
}

// Lägg till drag & drop-funktion
function laggTillDrag(div, kort) {
  div.addEventListener("dragstart", () => {
    div.classList.add("dragging");
    div.dataset.id = kort.id;
  });

  div.addEventListener("dragend", () => {
    div.classList.remove("dragging");
  });
}

// Rendera kort
function rendera() {
  document.querySelectorAll(".cards").forEach(c => c.innerHTML = "");

  cards.forEach(kort => {
    const div = document.createElement("div");
    div.className = "card";
    div.draggable = true;
    div.innerHTML = `
      <strong>${kort.titel}</strong>
      <p>${kort.beskrivning}</p>
      <button onclick="taBortKort(${kort.id})">Ta bort</button>
    `;

    laggTillDrag(div, kort); // lägg till dragfunktion
    document.querySelector(`#${kort.status} .cards`).appendChild(div);
  });
}

// Ställ in kolumner för drag & drop
document.querySelectorAll(".cards").forEach(column => {
  column.addEventListener("dragover", e => e.preventDefault());

  column.addEventListener("drop", e => {
    const dragging = document.querySelector(".dragging");
    if (!dragging) return;
    const id = dragging.dataset.id;
    const kort = cards.find(k => k.id == id);
    kort.status = column.parentElement.id;
    sparaOchRendera();
  });
});

// Kör vid sidan laddning
rendera();