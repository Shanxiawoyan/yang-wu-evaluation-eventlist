import { init, handleAddEvent } from "./controllers/eventController.js";

document.addEventListener("DOMContentLoaded", init);
document.getElementById("add-event-btn").addEventListener("click", handleAddEvent);
