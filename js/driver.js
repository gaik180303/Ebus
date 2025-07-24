// js/driver.js
import { auth, db } from './firebase-config.js';
import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

// Check if driver is logged in
onAuthStateChanged(auth, (user) => {
  if (!user) {
    alert("Unauthorized access. Please login as Driver.");
    window.location.href = "../index.html";
  }
});

window.postBusInfo = async function () {
  const busNumber = document.getElementById('busNumber').value;
  const busType = document.getElementById('busType').value;
  const contact = document.getElementById('contact').value;
  const pickUp = document.getElementById('pickUp').value;
  const destination = document.getElementById('destination').value;
  const departureTime = document.getElementById('departureTime').value;

  if (!busNumber || !busType || !contact || !pickUp || !destination || !departureTime) {
    alert("Please fill in all fields.");
    return;
  }

  const user = auth.currentUser;
  if (!user) {
    alert("Not authenticated");
    return;
  }

  try {
    await setDoc(doc(db, "buses", busNumber), {
      driverId: user.uid,
      busNumber,
      busType,
      contact,
      pickUp,
      destination,
      departureTime,
      timestamp: serverTimestamp()
    });
    alert("Bus details posted successfully.");
  } catch (err) {
    alert("Failed to post bus info: " + err.message);
  }
};

window.logout = async function () {
  try {
    await signOut(auth);
    window.location.href = "../index.html";
  } catch (error) {
    alert("Logout failed: " + error.message);
  }
};
