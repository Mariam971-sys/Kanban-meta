//Save Data
let cards = JSON.parse(localStorage.getItem("cards")) || [];

//add card

function addCard(status) {
  const title = prompt("Card title:");
  const description = prompt("Card description:");

  if (!title) return;

  const card = {
    id: Date.now(),
    title,
    description,
    status
  };

  cards.push(card);
  saveAndRender();
}
//Save + Render

function saveAndRender() {
  localStorage.setItem("cards", JSON.stringify(cards));
  render();
}
// Render Cards

function render() {
  document.querySelectorAll(".cards").forEach(c => c.innerHTML = "");

  cards.forEach(card => {
    const div = document.createElement("div");
    div.className = "card";
    div.draggable = true;
    div.innerHTML = `
      <strong>${card.title}</strong>
      <p>${card.description}</p>
      <button onclick="deleteCard(${card.id})">Delete</button>
    `;

    div.addEventListener("dragstart", () => {
      div.classList.add("dragging");
      div.dataset.id = card.id;
    });

    document.querySelector(`#${card.status} .cards`).appendChild(div);
  });
}
// Delete Card
document.querySelectorAll(".cards").forEach(column => {
  column.addEventListener("dragover", e => {
    e.preventDefault();
  });

  column.addEventListener("drop", e => {
    const id = document.querySelector(".dragging").dataset.id;
    const card = cards.find(c => c.id == id);
    card.status = column.parentElement.id;
    saveAndRender();
  });
});

// Run  Page Load
render();