// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAEUaYXgNfOlHzy7qQkFMZHsHpImpVRO54",
  authDomain: "walletwise2024.firebaseapp.com",
  projectId: "walletwise2024",
  storageBucket: "walletwise2024.appspot.com",
  messagingSenderId: "297434724089",
  appId: "1:297434724089:web:d7b07bdbb92ca6a4be1428",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
  setupAuthStateListener();
  setupNavbar();
  setupDropdownMenu();
  setupLogout();
  setupModal();
  setupDashboardButtons();
});

// Listen for authentication state changes
function setupAuthStateListener() {
  const cardHolderName = document.getElementById("cardHolderName");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const displayName = user.displayName || user.email.split("@")[0];
      if (cardHolderName) cardHolderName.textContent = displayName;
    } else {
      if (cardHolderName) cardHolderName.textContent = "Guest";
    }
  });
}

// Navbar functionality
function setupNavbar() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mainNav = document.querySelector(".main-nav");

  mobileMenuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("active");
    mobileMenuToggle.setAttribute("aria-expanded", mainNav.classList.contains("active"));
  });
}

// User dropdown menu
function setupDropdownMenu() {
  const userMenuButton = document.getElementById("user-menu-button");
  const userDropdown = document.getElementById("user-dropdown");

  userMenuButton.addEventListener("click", () => {
    userDropdown.classList.toggle("active");
    userMenuButton.setAttribute("aria-expanded", userDropdown.classList.contains("active"));
  });

  document.addEventListener("click", (event) => {
    if (!userMenuButton.contains(event.target) && !userDropdown.contains(event.target)) {
      userDropdown.classList.remove("active");
      userMenuButton.setAttribute("aria-expanded", "false");
    }
  });
}

// Logout functionality
function setupLogout() {
  const logoutButton = document.getElementById("logout-button");

  logoutButton.addEventListener("click", async (event) => {
    event.preventDefault();

    try {
      await signOut(auth);
      alert("Logged out successfully!");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error);
      alert("Failed to log out. Please try again.");
    }
  });
}

// Modal functionality
function setupModal() {
  const modal = document.getElementById("addMoneyModal");
  const openModalBtn = document.getElementById("openModalBtn");
  const closeModalBtn = document.querySelector(".close");
  const addMoneyForm = document.getElementById("addMoneyForm");
  const balanceAmount = document.getElementById("balanceAmount");

  // Open modal
  openModalBtn.addEventListener("click", () => {
    modal.style.display = "flex";
  });

  // Close modal
  closeModalBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Close modal when clicking outside
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // Close modal with escape key
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      modal.style.display = "none";
    }
  });

  // Handle Add Money form submission
  addMoneyForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const amountInput = document.getElementById("amountInput");
    const amount = parseFloat(amountInput.value);

    if (!isNaN(amount) && amount > 0) {
      const currentBalance = parseFloat(balanceAmount.textContent.replace("₦", "")) || 0;
      const newBalance = (currentBalance + amount).toFixed(2);
      balanceAmount.textContent = `$${newBalance}`;
      modal.style.display = "none";
      amountInput.value = ""; // Reset the input field
    } else {
      alert("Please enter a valid amount.");
    }
  });
}

// Dashboard buttons functionality
function setupDashboardButtons() {
  const dashboardIcons = document.querySelectorAll(".dashboard-icons .icon-item");

  dashboardIcons.forEach((iconItem) => {
    iconItem.addEventListener("click", () => {
      const section = iconItem.querySelector("p").textContent.toLowerCase();
      alert(`Navigating to ${section} section!`); // Replace this with actual navigation logic
    });
  });
}