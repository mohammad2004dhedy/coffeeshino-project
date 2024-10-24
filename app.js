// -------------------- Users Data Handling --------------------
let idCounter = localStorage.getItem("idCounter")
  ? JSON.parse(localStorage.getItem("idCounter"))
  : 0;
// Retrieve stored users data from localStorage, if exists
let usersData = localStorage.getItem("usersData")
  ? JSON.parse(localStorage.getItem("usersData"))
  : [];

// Template for a user object
let userTempObject = {
  id: -1,
  name: "coffeshino user",
  email: "noemail@gmail.com",
  phoneNumber: "+123 00000000",
  password: "no password",
  city: "no city",
  town: "no twon",
  describedLocation: "no described location",
  orders: "0",
  cart: [],
};

// Retrieve the currently logged-in user from localStorage, if exists
let loggedInUser = localStorage.getItem("logeedINUser")
  ? JSON.parse(localStorage.getItem("logeedINUser"))
  : userTempObject;

// Check if the user is logged in based on localStorage flag
let isLoggedIn = localStorage.getItem("checkAccountLogingIn") ? true : false;
showProfileInfo(loggedInUser);
function showProfileInfo(userInfo) {
  document.getElementById("UserName").innerHTML = userInfo.name;
  document.getElementById("userEmail").innerHTML = userInfo.email;
  document.getElementById("navUserName").innerHTML = userInfo.name;
  document.getElementById("userPhone").innerHTML = userInfo.phoneNumber;
  document.getElementById("userCity").innerHTML = userInfo.city;
  document.getElementById("userTown").innerHTML = userInfo.town;
  document.getElementById("describedAddress").innerHTML =
    userInfo.describedLocation;
  document.getElementById("numberOfOrders").innerHTML = userInfo.orders;
}
// -------------------- Alert Handling --------------------

// Function to show and hide the login alert message
function ActiveLoginAlert() {
  loginAlert.classList.add("active");
  setTimeout(() => {
    loginAlert.classList.remove("active");
  }, 3500);
}

// -------------------- Show and Hide User Profile --------------------

let navUserName = document.getElementById("navUserName");
let Userprofile = document.querySelector(".Userprofile");
let closeProfile = document.querySelector(".closeProfile");

// Toggle user profile visibility when clicking the username
navUserName.addEventListener("click", () => {
  Userprofile.classList.toggle("active");
});

// Close user profile when clicking the close button
closeProfile.addEventListener("click", () => {
  Userprofile.classList.remove("active");
});

// -------------------- Login / Signup Page Toggle --------------------

let loginSignUpPage = document.querySelector(".loginSignUp");
let signupForm = document.querySelector("#SignUpForm");
let SignUpLink = document.querySelector(".SignUpFormBTN");
let LoginFormLink = document.querySelector(".LoginFormBtn");

// Show signup form when clicking on the signup link
SignUpLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.add("active");
});

// Show login form when clicking on the login link
LoginFormLink.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.remove("active");
});

// Close the login/signup page
document.querySelector(".closeLoginPage").onclick = () => {
  loginSignUpPage.classList.add("disabled");
};

// Open the login/signup page
document.querySelector(".HeaderloginBtn").onclick = (e) => {
  e.preventDefault();
  loginSignUpPage.classList.remove("disabled");
};

// -------------------- Handle User Data for Login / Signup Forms --------------------

let SignUpForm = document.getElementById("SignUpForm");
let loginForm = document.getElementById("loginForm");

// Handle signup form submission
SignUpForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form input values
  let signUpName = document.getElementById("signUpName").value;
  let signUpEmail = document.getElementById("signUpEmail").value;
  let signUpPassword = document.getElementById("signUpPassword").value;
  let signUpUserCity = document.getElementById("signUpUserCity").value;
  let signUpUserTown = document.getElementById("signUpUserTown").value;
  let signUpLocation = document.getElementById("signUpLocation").value;
  let signUpPhoneNumber = document.getElementById("signUpPhoneNumber").value;
  // Add new user data to the users array
  let accountAlreadyExist = false;
  usersData.forEach((data) => {
    if (data.email == signUpEmail) {
      accountAlreadyExist = true;
    }
  });
  if (accountAlreadyExist == true) {
    loginAlert.innerHTML = "account is already exist :!";
  } else {
    usersData.push({
      id: idCounter,
      name: signUpName,
      email: signUpEmail,
      phoneNumber: signUpPhoneNumber,
      password: signUpPassword,
      city: signUpUserCity,
      town: signUpUserTown,
      describedLocation: signUpLocation,
      orders: "0",
      cart: [],
    });
    idCounter++;
    localStorage.setItem("idCounter", JSON.stringify(idCounter));
    // Store updated users data in localStorage
    localStorage.setItem("usersData", JSON.stringify(usersData));

    // Show success message
    loginAlert.innerHTML = `Your account has been created successfully <i class="fa-solid fa-check"></i>, please login to start your journey with us`;
    LoginFormLink.click(); // Switch to the login form
  }
  ActiveLoginAlert();
});

let accountFound = false;

// Handle login form submission
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form input values
  let loginEmail = document.getElementById("login-email").value;
  let loginPassword = document.getElementById("login-password").value;

  // Check if the user credentials match any account
  usersData.forEach((data) => {
    if (data.email == loginEmail && data.password == loginPassword) {
      accountFound = true;
      loggedInUser = { ...data };
      localStorage.setItem("logeedINUser", JSON.stringify(loggedInUser));
    }
  });

  if (!accountFound) {
    // Show error message if account is not found
    loginAlert.innerHTML = `Wrong email or password :(`;
  } else {
    // Show success message and log the user in
    loginAlert.innerHTML = `Welcome ${loggedInUser.name}`;
    loginSignUpPage.classList.add("disabled"); // Close login/signup page
    navlogedInMode.classList.add("logedIn"); // Show logged-in state
    localStorage.setItem("checkAccountLogingIn", JSON.stringify(true)); // Store login status
    showProfileInfo(loggedInUser);
  }
  ActiveLoginAlert();
});

// Handle account logout
AccountLogOut.addEventListener("click", () => {
  localStorage.removeItem("checkAccountLogingIn"); // Remove login status
  window.location.reload(); // Reload the page to reset state
});

// Check login status on page load and update UI accordingly
window.addEventListener("load", () => {
  isLoggedIn
    ? navlogedInMode.classList.add("logedIn")
    : navlogedInMode.classList.remove("logedIn");
});
// ------------------------fetch data from api------------------------------

//  customers contact form :
document.getElementById("bookTableForm").addEventListener("submit", (event) => {
  event.preventDefault();
  emailjs.sendForm("service_bk5hwqg", "template_t0iuzoj", event.target).then(
    () => {
      loginAlert.innerHTML = "email sent successfully";
    },
    (error) => {
      loginAlert.innerHTML = "failed to sent email :!";
    }
  );
  ActiveLoginAlert();
});
