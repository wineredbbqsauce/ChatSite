import { useState } from "react";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleRegister = (e) => {
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

          {/* <div className="input-box">
                        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                        <i className="vx bxs-user"></i>
                    </div> */}

          <div className="inputbox">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="vx bxs-envelope"></i>
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
            onClick={handleRegister}
          >
            Register
          </button>

          <div className="registr-link">
            <p>
              Don't Have An Account? <a href="/Register">Register</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
