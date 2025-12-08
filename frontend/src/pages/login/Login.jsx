import { useState } from "react";
import "../../styles/login/sign-up.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
    if (password.trim() === "") {
      alert("Please enter your password.");
      return;
    }

    // Registration logic here
    console.log("Registration submitted: ", {
      email,
      password,
      rememberMe,
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
          <h1>Login</h1>

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

          <div className="input-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i
              className="fa-solid fa-lock"
              id="lock-icon"
              style={{ display: showPassword ? "none" : "inline" }}
              onClick={togglePassword}
            ></i>
            <i
              className="fa-solid fa-lock-open"
              id="unlock-icon"
              style={{ display: showPassword ? "inline" : "none" }}
              onClick={togglePassword}
            ></i>
          </div>

          <div className="remember-forgot">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="btn"
            id="register"
            onClick={handleLogin}
          >
            Login
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
