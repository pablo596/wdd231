export function createServiceCard(service) {
  const card = document.createElement("div");
  card.className = "service-card";
  card.innerHTML = `
    <img src="${service.image}" alt="${service.title}" width="300" height="200" loading="lazy">
    <h3>${service.title}</h3>
    <p>${service.description}</p>
    <p><strong>Ubicación:</strong> ${service.location}</p>
    <p><strong>Fecha:</strong> ${service.date}</p>
    <p><strong>Categoría:</strong> ${service.category}</p>
  `;
  return card;
}

// Código adicional para opportunities.html: si la página detecta el contenedor de oportunidades, se cargan los servicios.
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("opportunities-container")) {
    fetch("data/services.json")
      .then((response) => response.json())
      .then((services) => {
        const container = document.getElementById("opportunities-container");
        services.forEach((service) => {
          const card = createServiceCard(service);
          container.appendChild(card);
        });
      })
      .catch((error) => console.error("Error al cargar servicios:", error));
  }
});
