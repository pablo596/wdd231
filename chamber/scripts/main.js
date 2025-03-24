document.addEventListener("DOMContentLoaded", () => {
  // Update footer dates
  const currentYearSpan = document.getElementById("currentYear");
  const lastModifiedSpan = document.getElementById("lastModified");

  const currentYear = new Date().getFullYear();
  currentYearSpan.textContent = currentYear;
  lastModifiedSpan.textContent = document.lastModified;

  // Toggle view functionality
  const gridViewBtn = document.getElementById("gridView");
  const listViewBtn = document.getElementById("listView");
  const membersSection = document.getElementById("members");

  gridViewBtn.addEventListener("click", () => {
    membersSection.classList.remove("list");
    membersSection.classList.add("grid");
  });

  listViewBtn.addEventListener("click", () => {
    membersSection.classList.remove("grid");
    membersSection.classList.add("list");
  });

  //   Fetch and display members from JSON data
  const fetchMembers = async () => {
    try {
      const response = await fetch("data/members.json");
      if (!response.ok) throw new Error("Network response was not ok");

      const members = await response.json();
      displayMembers(members);
      // document.querySelector(".my-svg-icon")?.style.color = "red";
    } catch (error) {
      console.error("There was a problem fetching the members data:", error);
    }
  };

  const displayMembers = (members) => {
    let output = "";
    members.forEach((member) => {
      output += `
        <div class="member-card">
          <div class="member-card-header">
            <div class="member-card-title">
              <h3 class="business-name">${member.name}</h3>
              <p class="business-tagline">${member.membershipLevel} Member</p>
            </div>
            <div class="tooltip-container">
              <span class="tooltip-text"><strong>Membership Level:</strong> ${
                member.membershipLevel
              }</span>
              <svg class="member-${member.membershipLevel.toLowerCase()}" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="currentColor" d="M21.947 9.179a1.001 1.001 0 0 0-.868-.676l-5.701-.453-2.467-5.461a.998.998 0 0 0-1.822-.001L8.622 8.05l-5.701.453a1 1 0 0 0-.619 1.713l4.213 4.107-1.49 6.452a1 1 0 0 0 1.53 1.057L12 18.202l5.445 3.63a1.001 1.001 0 0 0 1.517-1.106l-1.829-6.4 4.536-4.082c.297-.268.406-.686.278-1.065z"></path>
              </svg>
            </div>
          </div>
          <hr />
          <div class="member-card-content">
            <img
              src="images/${member.image}"
              alt="${member.name} Logo"
              class="member-logo"
            />
            <div class="member-info">
              <p><strong>EMAIL:</strong> ${member.email}</p>
              <p><strong>PHONE:</strong> ${member.phone}</p>
              <p><strong>ADDRESS:</strong> ${member.address}</p>
              <p><a href="${
                member.website
              }" target="_blank">Visit the website</a></p>
            </div>
          </div>
        </div>
      `;
    });
    membersSection.innerHTML = output;
  };

  //   Initiate fetching of members data
  fetchMembers();

  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
});
