import { useState } from "react";
import "../../styles/login/sign-up.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.trim() === "") {
      alert("Please enter a valid email address.");
      return;
    }

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Registration logic here
    console.log("Registration submitted: ", {
      email,
    });

    // Example: Redirect after success registration
    // window.location.href = "/dashboard";
  };

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      />
      <link
        rel="stylesheet"
        href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
      />

      <div className="wrapper">
        <div>
          <h1>Forgot Password</h1>

          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="bx bxs-envelope"></i>
          </div>

          <button
            type="submit"
            className="btn"
            id="register"
            onClick={handleLogin}
          >
            Send Email
          </button>

          <div className="register-link">
            <p>
              Don't Have An Account? <a href="/Login">Register</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
