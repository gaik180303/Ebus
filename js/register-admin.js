// js/register-admin.js
import { auth, db } from './firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { logAction } from './logger.js';

window.registerAdmin = async function () {
  const email = document.getElementById('adminEmail').value;
  const password = document.getElementById('adminPassword').value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Store the admin role in Firestore
    await setDoc(doc(db, "admins", userCred.user.uid), {
      email: email,
      role: "admin"
    });

    logAction("ADMIN REGISTER", userCred.user.uid);
    alert("Admin registered successfully! You can now log in.");
    window.location.href = "index.html";
  } catch (err) {
    alert("Admin registration failed: " + err.message);
  }
};
