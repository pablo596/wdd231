document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("discoverGallery");

  // Display visit message using localStorage
  const sidebarMessage = document.getElementById("visitMessage");
  const lastVisit = localStorage.getItem("lastVisit");
  const now = Date.now();

  if (!lastVisit) {
    // First-time visit message
    sidebarMessage.textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    // Calculate days since last visit
    const daysDiff = Math.floor(
      (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff < 1) {
      sidebarMessage.textContent = "Back so soon! Awesome!";
    } else if (daysDiff === 1) {
      sidebarMessage.textContent = "You last visited 1 day ago.";
    } else {
      sidebarMessage.textContent = `You last visited ${daysDiff} days ago.`;
    }
  }

  // Update localStorage with current visit timestamp
  localStorage.setItem("lastVisit", now);

  // Fetch and render JSON data into the page
  fetch("./data/discover.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((place, index) => {
        // Create a card for each place
        const card = document.createElement("div");
        card.className = `card card-${index + 1}`;
        card.innerHTML = `
              <h2>${place?.name}</h2>
              <figure>
                <img src="${place?.image}" width="300" height="200" alt="${
          place?.name
        }" ${index > 0 ? `loading="lazy"` : ""}>
              </figure>
              <address>${place?.address}</address>
              <p>${place?.description}</p>
              <button class="discover-card-btn">Learn more</button>
            `;

        container.appendChild(card);
      });
    })
    .catch((err) => {
      // Handle error when loading JSON
      console.error("Error loading JSON:", err);
      container.innerHTML =
        "<p>Error loading data. Please try again later.</p>";
    });
});
