// courses.js

// Array of course objects (example)
const courses = [
    {
      code: "CSE 110",
      name: "Introduction to Programming",
      credits: 3,
      completed: true
    },
    {
      code: "WDD 130",
      name: "Web Fundamentals",
      credits: 3,
      completed: true
    },
    {
      code: "CSE 111",
      name: "Programming with Functions",
      credits: 3,
      completed: false
    },
    {
      code: "CSE 210",
      name: "Programming and Problem Solving",
      credits: 3,
      completed: false
    },
    {
      code: "WDD 230",
      name: "Web Frontend Development",
      credits: 3,
      completed: false
    },
    {
      code: "WDD 231",
      name: "Intermediate Web Development (this course)",
      credits: 3,
      completed: false
    }
  ];
  
  // Select the container and filter buttons
  const coursesContainer = document.getElementById("coursesContainer");
  const btnAll = document.getElementById("btnAll");
  const btnCse = document.getElementById("btnCse");
  const btnWdd = document.getElementById("btnWdd");
  const totalCreditsSpan = document.getElementById("totalCredits");
  
  // Function to render courses on the page
  function renderCourses(coursesArray) {
    // Clear the courses container
    coursesContainer.innerHTML = "";
  
    // Calculate total credits
    let totalCredits = 0;
  
    // Create course cards
    coursesArray.forEach((course) => {
      totalCredits += course.credits; // Sum credits
  
      // Create a div for the course card
      const courseCard = document.createElement("div");
      courseCard.classList.add("course-card");
      if (course.completed) {
        courseCard.classList.add("completed");
      }
  
      // Set inner HTML for the card
      courseCard.innerHTML = `
        <h3>${course.code}</h3>
        <p>${course.name}</p>
        <p>Credits: ${course.credits}</p>
        <p>Completed: ${course.completed ? "Yes" : "No"}</p>
      `;
  
      // Append the card to the container
      coursesContainer.appendChild(courseCard);
    });
  
    // Update the total credits display
    totalCreditsSpan.textContent = totalCredits;
  }
  
  // Filter functions
  function filterCourses(type) {
    if (type === "all") {
      renderCourses(courses);
    } else if (type === "CSE") {
      const filtered = courses.filter(course => course.code.startsWith("CSE"));
      renderCourses(filtered);
    } else if (type === "WDD") {
      const filtered = courses.filter(course => course.code.startsWith("WDD"));
      renderCourses(filtered);
    }
  }
  
  // Event listeners for filter buttons
  btnAll.addEventListener("click", () => filterCourses("all"));
  btnCse.addEventListener("click", () => filterCourses("CSE"));
  btnWdd.addEventListener("click", () => filterCourses("WDD"));
  
  // Render all courses when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    renderCourses(courses);
  });
  