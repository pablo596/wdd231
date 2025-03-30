const tsInput = document.getElementById("timestamp");
if (tsInput) {
  tsInput.value = new Date().toISOString();
  tsInput.innerHTML = new Date().toLocaleString();
}
// MODAL close on backdrop click
const modals = document.querySelectorAll("dialog");
modals.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    const rect = modal.getBoundingClientRect();
    const isInDialog =
      rect.top <= event.clientY &&
      event.clientY <= rect.top + rect.height &&
      rect.left <= event.clientX &&
      event.clientX <= rect.left + rect.width;
    if (!isInDialog) {
      modal.close();
    }
  });
});

// THANK YOU Page population
const params = new URLSearchParams(window.location.search);

const setText = (id, value) => {
  const el = document.getElementById(id);
  if (el) el.textContent = value || "-";
};

setText("firstName", params.get("fname"));
setText("lastName", params.get("lname"));
setText("email", params.get("email"));
setText("phone", params.get("phone"));
setText("organization", params.get("organization"));

const timestamp = params.get("timestamp");
if (timestamp && document.getElementById("timestamp")) {
  const date = new Date(timestamp);
  document.getElementById("timestamp").textContent = date.toLocaleString();
}
