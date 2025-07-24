import { auth, db } from './firebase-config.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { logAction } from './logger.js';

// Login function (common for all roles)
window.login = async function () {
  const email = document.getElementById('email').value;
  const pass = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const uid = userCredential.user.uid;

    const userDoc = await getDoc(doc(db, role + "s", uid));
    if (userDoc.exists()) {
      logAction(`${role.toUpperCase()} LOGIN`, uid);
      window.location.href = `dashboard/${role}.html`;
    } else {
      alert("Invalid role or unauthorized account");
    }
  } catch (err) {
    alert("Login failed: " + err.message);
  }
};

// Register User
window.registerUser = async function () {
  const first = document.getElementById('firstName').value;
  const last = document.getElementById('lastName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", userCred.user.uid), {
      firstName: first,
      lastName: last,
      email: email
    });
    logAction("USER REGISTER", userCred.user.uid);
    alert("Registration successful! Please log in.");
    window.location.href = "index.html";
  } catch (err) {
    alert("Registration failed: " + err.message);
  }
};

// Register Admin
window.registerAdmin = async function () {
  const first = document.getElementById('firstName').value;
  const last = document.getElementById('lastName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "admins", userCred.user.uid), {
      firstName: first,
      lastName: last,
      email: email
    });
    logAction("ADMIN REGISTER", userCred.user.uid);
    alert("Admin registration successful! Please log in.");
    window.location.href = "index.html";
  } catch (err) {
    alert("Admin registration failed: " + err.message);
  }
};

// Register Driver
window.registerDriver = async function () {
  const first = document.getElementById('firstName').value;
  const last = document.getElementById('lastName').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "drivers", userCred.user.uid), {
      firstName: first,
      lastName: last,
      email: email
    });
    logAction("DRIVER REGISTER", userCred.user.uid);
    alert("Driver registration successful! Please log in.");
    window.location.href = "index.html";
  } catch (err) {
    alert("Driver registration failed: " + err.message);
  }
};

// Unified register handler
window.registerByRole = function () {
  const role = document.getElementById('regRole').value;
  if (role === "admin") registerAdmin();
  else if (role === "driver") registerDriver();
  else registerUser();
};
