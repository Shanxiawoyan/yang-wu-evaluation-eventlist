import { updateEvent, getEvents } from "../models/eventModel.js";

export function renderEvents(events, onEdit, onDelete) {
  const tbody = document.getElementById("event-body");
  tbody.innerHTML = "";

  events.forEach(event => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${event.name}</td>
      <td>${event.start}</td>
      <td>${event.end}</td>
      <td>
        <button class="action-btn edit-btn">✏️</button>
        <button class="action-btn delete-btn">🗑️</button>
      </td>`;

    tr.querySelector(".edit-btn").addEventListener("click", () => {
      renderEditRow(event, onEdit);
    });

    tr.querySelector(".delete-btn").addEventListener("click", () => onDelete(event.id));
    tbody.appendChild(tr);
  });
}

function renderEditRow(event, onEdit) {
  const tbody = document.getElementById("event-body");
  const rows = Array.from(tbody.children);
  const index = rows.findIndex(row => row.children[0].textContent === event.name);
  if (index === -1) return;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" value="${event.name}" /></td>
    <td><input type="date" value="${event.start}" /></td>
    <td><input type="date" value="${event.end}" /></td>
    <td>
      <button class="action-btn save-btn">➕</button>
      <button class="action-btn cancel-btn">❌</button>
    </td>`;

  const [nameInput, startInput, endInput] = tr.querySelectorAll("input");

  tr.querySelector(".save-btn").addEventListener("click", async () => {
    const updated = {
      name: nameInput.value,
      start: startInput.value,
      end: endInput.value
    };
    await updateEvent(event.id, updated);
    const refreshed = await getEvents();
    renderEvents(refreshed, onEdit, handleDelete);
  });

  tr.querySelector(".cancel-btn").addEventListener("click", () => {
    renderEvents(rows.map(r => {
      return {
        name: r.children[0].textContent,
        start: r.children[1].textContent,
        end: r.children[2].textContent,
        id: event.id
      };
    }), onEdit, handleDelete);
  });

  tbody.replaceChild(tr, rows[index]);
}

export function renderNewEventRow(onSave) {
  const tbody = document.getElementById("event-body");

  if ([...tbody.children].some(row => row.querySelector("input"))) return;

  const tr = document.createElement("tr");
  tr.innerHTML = `
    <td><input type="text" placeholder="Event name"/></td>
    <td><input type="date"/></td>
    <td><input type="date"/></td>
    <td>
      <button class="action-btn save-btn">➕</button>
      <button class="action-btn cancel-btn">❌</button>
    </td>`;

  const [nameInput, startInput, endInput] = tr.querySelectorAll("input");

  tr.querySelector(".save-btn").addEventListener("click", () => {
    if (!nameInput.value || !startInput.value || !endInput.value) {
      alert("All fields required!");
      return;
    }
    onSave({
      name: nameInput.value,
      start: startInput.value,
      end: endInput.value
    });
  });

  tr.querySelector(".cancel-btn").addEventListener("click", () => tr.remove());

  tbody.appendChild(tr);
}
