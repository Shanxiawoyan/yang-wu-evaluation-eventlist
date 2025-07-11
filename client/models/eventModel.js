const BASE_URL = "http://localhost:3000/events";

export async function getEvents() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function createEvent(event) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event)
  });

  const data = await res.json();
  if (!data.id) throw new Error("Event creation failed: No ID returned");
  return data;
}

export async function updateEvent(id, updatedEvent) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedEvent)
  });
  return res.json();
}

export async function deleteEvent(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete");
}
