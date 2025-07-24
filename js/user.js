// js/user.js
import { auth, db } from './firebase-config.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

// Logout function
window.logout = async function () {
  await signOut(auth);
  window.location.href = "../index.html";
};

// Search Bus Function
window.searchBus = async function () {
  const source = document.getElementById('source').value.trim().toLowerCase();
  const destination = document.getElementById('destination').value.trim().toLowerCase();
  const resultsContainer = document.getElementById('busResults');
  resultsContainer.innerHTML = "Searching...";

  try {
    const busesRef = collection(db, "buses");
    const allBusesSnap = await getDocs(busesRef);

    let matches = [];

    allBusesSnap.forEach(docSnap => {
      const data = docSnap.data();
      if (
        data.pickUp?.toLowerCase() === source &&
        data.destination?.toLowerCase() === destination
      ) {
        matches.push(data);
      }
    });

    if (matches.length === 0) {
      resultsContainer.innerHTML = "<p>No buses found for the given route.</p>";
    } else {
      resultsContainer.innerHTML = matches.map(bus => `
        <div class="bus-card">
          <p><strong>Bus No:</strong> ${bus.busNumber}</p>
          <p><strong>Type:</strong> ${bus.busType}</p>
          <p><strong>Contact:</strong> ${bus.contact}</p>
          <p><strong>Departure:</strong> ${bus.departureTime}</p>
        </div>
      `).join('');
    }

  } catch (err) {
    console.error("Search error:", err);
    resultsContainer.innerHTML = "<p>Error while searching buses.</p>";
  }
};
