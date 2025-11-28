const sendCode = document.getElementById("send-code");
const emailInput = document.getElementById("email-input");
const errorMessage = document.getElementById("error-message");

function resetPasswordInput() {
    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    errorMessage.style.display = "none";
    errorMessage.content = "";

    if (email === "") {
        errorMessage.content = "Please enter a valid email adress.";
        // errorMessage.style.display = "block";
        return;
    }


    if (!emailPattern.test(email)) {
        errorMessage.content = "Please enter a valid email adress.";
        // errorMessage.style.display = "block";
        return;
    }

    // emailInput.classList.add("error");

    window.location.href = "../reset-password/index.html";
}

sendCode.addEventListener("click", resetPasswordInput)


// const sendCode = document.getElementById("send-code")
// const imputBox = document.getElementById("input-box")

// function resetPasswordInput () {
//     const email = imputBox.value.trim();
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (email === "" || !emailRegex.test(email)) {
//         alert("Please enter a valid email address.");
//         return;
//     }
//     window.location.href = "../reset-password/index.html";
// }

// sendCode.addEventListener("click", resetPasswordInput)
