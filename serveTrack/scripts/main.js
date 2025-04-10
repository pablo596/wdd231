// Importa la función para crear una tarjeta de servicio
import { createServiceCard } from "./services.js";

document.addEventListener("DOMContentLoaded", () => {
  // Mostrar el mensaje de la última visita.
  const lastVisitElement = document.getElementById("last-visit");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = new Date();
  if (lastVisit) {
    lastVisitElement.textContent = `Tu última visita fue: ${new Date(
      lastVisit
    ).toLocaleString()}`;
  } else {
    lastVisitElement.textContent = "¡Esta es tu primera visita!";
  }
  localStorage.setItem("lastVisit", now.toString());

  // Cargar el JSON de servicios y crear las tarjetas de servicio
  fetch("data/services.json")
    .then((response) => response.json())
    .then((services) => {
      const servicesContainer = document.getElementById("services-cards");
      services.forEach((service) => {
        const card = createServiceCard(service);
        servicesContainer.appendChild(card);
      });
    })
    .catch((error) => console.error("Error al cargar servicios:", error));

  // Lógica para el modal de "Más Información"
  const learnMoreButton = document.getElementById("learn-more");
  learnMoreButton.addEventListener("click", openModal);
});

function openModal() {
  // Crear dinámicamente un elemento modal
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-button">&times;</span>
      <h2>Más Información</h2>
      <p>Aquí encontrarás información adicional sobre los servicios destacados.</p>
    </div>
  `;
  document.body.appendChild(modal);

  // Cerrar el modal al hacer clic en el botón de cierre
  modal.querySelector(".close-button").addEventListener("click", () => {
    document.body.removeChild(modal);
  });

  // Cerrar el modal si se hace clic fuera del contenido
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      document.body.removeChild(modal);
    }
  });
}
