const passwordInput = document.getElementById("password");
const lockIcon = document.getElementById("lock-icon");
const unlockIcon = document.getElementById("unlock-icon");
const emailInput = document.getElementById("email-input");
const sendCode = document.getElementById("login");

function togglePassword(){
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";

    // Toggle which icon is visible
    lockIcon.style.display = isHidden ? "none" : "inline";
    unlockIcon.style.display = isHidden ? "inline" : "none";
}

lockIcon.addEventListener("click", togglePassword);
unlockIcon.addEventListener("click", togglePassword);


function validEmail() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        alert("Please enter a valid email adress.");
        return;
    }


    if (!emailPattern.test(email)) {
        alert("Please enter a valid email adress.");
        return;
    }

    // emailInput.classList.add("error");

    // window.location.href = "../reset-password/index.html";
}

sendCode.addEventListener("click", validEmail)