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
    } catch (error) {
      console.error("There was a problem fetching the members data:", error);
    }
  };

  const displayMembers = (members) => {
    let output = "";
    members.forEach((member) => {
      output += `
          <div class="member-card">
              <img src="images/${member.image}" alt="${member.name}"/>
              <div class="member-info">
                  <h3>${member.name}</h3>
                  <p><strong>Address:</strong> ${member.address}</p>
                  <p><strong>Phone:</strong> ${member.phone}</p>
                  <p><a href="${member.website}" target="_blank">Visit Website</a></p>
                  <p><strong>Membership Level:</strong> ${member.membershipLevel}</p>
                  <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
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
