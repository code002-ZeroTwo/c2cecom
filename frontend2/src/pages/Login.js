import React, { useState } from "react";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, password }),
    });

    setNavigate(true);

    // try catch this is better method to do thing

    const getdata = await fetch("http://localhost:8000/", {
      headers: {"Content-Type":"application/json"},
      credentials:"include",
    })

    const data = await getdata.json();
    console.log(data);
    props.setName(data.name);
    

  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="">
          <input
            type="text"
            className="form-control"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div className="">
          <input
            type="password"
            className="form-control"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>

        <button className="btn btn-primary w-100 py-2" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
