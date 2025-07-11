import { getEvents, createEvent, deleteEvent } from "../models/eventModel.js";
import { renderEvents, renderNewEventRow } from "../views/eventView.js";

export async function init() {
  const events = await getEvents();
  renderEvents(events, handleEdit, handleDelete);
}

export function handleAddEvent() {
  renderNewEventRow(async (newEvent) => {
    await createEvent(newEvent);
    init();
  });
}

async function handleEdit(event) {
  // Edit logic is handled in the view
}

async function handleDelete(id) {
  await deleteEvent(id);
  init();
}
