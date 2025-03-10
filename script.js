document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".icon-btn");
  const sections = document.querySelectorAll("section");
  const aboutButton = document.getElementById("abt-btn"); // "More About Me" button
  const aboutSection = document.getElementById("about");

  function showSection(index) {
    sections.forEach((section, i) => {
      section.style.display = i === index ? "block" : "none";
    });

    // Set active class on sidebar buttons
    buttons.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  }

  // Sidebar Navigation
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      showSection(index);
    });
  });

  // Handle "More About Me" button click
  if (aboutButton && aboutSection) {
    aboutButton.addEventListener("click", () => {
      const aboutIndex = [...sections].indexOf(aboutSection); // Find index of About section

      if (aboutIndex !== -1) {
        showSection(aboutIndex);
      }
    });
  }

  showSection(0); // Show Home section by default
});

document.addEventListener("DOMContentLoaded", () => {
  const circles = document.querySelectorAll(".skill-progress");

  circles.forEach((circle) => {
    let percent = circle.getAttribute("data-percent");
    let circumference = 2 * Math.PI * 40; // 2πr (r=40)
    let offset = circumference - (percent / 100) * circumference;

    circle.style.strokeDashoffset = offset;

    // Find the corresponding percentage text
    let skillItem = circle.closest(".skill-item");
    let percentageText = skillItem.querySelector(".skill-percentage");
    percentageText.textContent = percent + "%";
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const portfolioContainer = document.getElementById("portfolio-container");
  const menuButtons = document.querySelectorAll(".menu-btn");
  const modal = document.getElementById("portfolio-modal");
  const modalTitle = document.getElementById("modal-title");
  const modalName = document.getElementById("modal-name");
  const modalClient = document.getElementById("modal-client");
  const modalLanguage = document.getElementById("modal-language");
  const modalPreview = document.getElementById("modal-preview");
  const modalImage = document.getElementById("modal-image");
  const closeModal = document.querySelector(".close-btn");
  let portfolioData = {};

  // Load JSON Data
  fetch("portfolio.json")
    .then((response) => response.json())
    .then((data) => {
      portfolioData = data;
      displayItems("all"); // Default category
    })
    .catch((error) => console.error("Error loading portfolio:", error));

  // Change active category
  menuButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelector(".menu-btn.active").classList.remove("active");
      this.classList.add("active");
      displayItems(this.textContent.trim().toLowerCase()); // Use button text as key
    });
  });

  // Display portfolio items dynamically
  function displayItems(category) {
    portfolioContainer.innerHTML = "";
    let items;

    if (category === "all") {
      items = portfolioData; // Show everything
    } else {
      items = portfolioData.filter((item) => item.category === category);
    }

    items.forEach((item) => {
      const projectItem = document.createElement("div");
      projectItem.classList.add("portfolio-item");
      projectItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
            `;
      projectItem.addEventListener("click", () => showModal(item));
      portfolioContainer.appendChild(projectItem);
    });
  }

  // Show modal with project details
  function showModal(item) {
    modalTitle.textContent = item.name;
    modalName.textContent = item.name;
    modalClient.textContent = item.client || "N/A";
    modalLanguage.textContent = item.language || "N/A";
    modalPreview.href = item.preview || "#";
    modalPreview.textContent = item.preview || "No Preview";
    modalImage.src = item.image;
    modal.style.display = "flex";
  }

  // Close modal functionality
  closeModal.addEventListener("click", () => (modal.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === modal) modal.style.display = "none";
  });
});

window.addEventListener("load", function () {
  function updateTimelineHeights() {
    let allLoaded = true;

    for (let i = 1; i <= 3; i++) {
      const icon = document.getElementById(`timeline-icon-${i}`);
      const content = document.getElementById(`timeline-content-${i}`);

      if (icon && content) {
        const contentHeight = content.clientHeight;

        if (contentHeight === 0) {
          allLoaded = false; // Keep checking if any content height is still 0
        }

        const newHeight = Math.max(10, contentHeight - 75);

        icon.style.setProperty("--after-height", `${newHeight}px`);
      }
    }

    if (!allLoaded) {
      setTimeout(updateTimelineHeights, 100); // Keep checking until heights are set
    }
  }

  updateTimelineHeights(); // Start checking on load
});
$(document).ready(function () {
  function checkForm() {
    let isValid = true;

    // Check if any input field or textarea is empty
    $("#contact-form-unique input, #contact-form-unique textarea").each(
      function () {
        if ($(this).val().trim() === "") {
          isValid = false;
        }
      }
    );

    // Enable or disable button based on validity
    $("#submit-msg").prop("disabled", !isValid);
  }

  // Run check on input changes
  $("#contact-form-unique input, #contact-form-unique textarea").on(
    "input",
    checkForm
  );

  // Initially disable the button
  $("#submit-msg").prop("disabled", true);
});
document
  .getElementById("contact-form-unique")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
    const responseMessage = document.createElement("p"); // Create a response message dynamically
    document.getElementById("contact-form-unique").appendChild(responseMessage);

    responseMessage.textContent = "Sending...";
    responseMessage.style.color = "blue";

    try {
      const response = await fetch(
        "https://gaddevinay-portfolio.vercel.app/api/send-email2.js",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, subject, message }), // Include subject
        }
      );

      const data = await response.json();
      responseMessage.textContent = data.message;
      responseMessage.style.color = response.ok ? "green" : "red";

      if (response.ok) {
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("Error:", error);
      responseMessage.textContent = "Error sending email.";
      responseMessage.style.color = "red";
    }
  });
