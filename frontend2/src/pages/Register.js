import React, { useState } from "react";
import { Navigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const submit = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, username }),
    });

    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please Register</h1>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="Full Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <input
            type="email"
            className="form-control"
            placeholder="name@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <input
            type="number"
            name="phone"
            pattern="^(01|9[78]\d)-\d{3}-\d{4}$"
            className="form-control"
            placeholder="Phone Number"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default Register;
