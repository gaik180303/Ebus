import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { logAction } from './logger.js';
import { signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

window.createDriver = async function () {
  const email = document.getElementById('driverEmail').value;
  const password = document.getElementById('driverPassword').value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Save driver info in Firestore
    await setDoc(doc(db, "drivers", userCred.user.uid), {
      email: email,
      role: "driver"
    });

    logAction("ADMIN CREATED DRIVER", userCred.user.uid);
    alert("Driver account created successfully!");
  } catch (err) {
    alert("Failed to create driver: " + err.message);
  }
};
window.logout = async function () {
  try {
    await signOut(auth);
    window.location.href = "../index.html"; // or your login page
  } catch (err) {
    alert("Logout failed: " + err.message);
  }
};
