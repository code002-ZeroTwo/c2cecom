import "./App.css";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useState, useEffect, useReducer } from "react";
import Product from "./components/Product";
import EachProduct from "./components/EachProduct";
import Profile from "./components/Profile";

function App() {
  const [name, setName] = useState("");
  const [content, setContent] = useState({});
  const [token, setToken] = useState("");

  useEffect(() => {
    console.log(token +"from app.js");
  })


  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      console.log("hello");
      setName(content.name);
      setContent(content);
    })();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName} />
        <main className="form-signin">
          <Routes>
            <Route path="/" Component={() => <Home name={name} />} />
            <Route
              path="/login"
              Component={() => (
                <Login setName={setName} setContent={setContent} token={token} setToken={setToken}/>
              )}
            />
            <Route path="/register" Component={Register} />
            <Route path="/list" Component={Product} />
            <Route
              path="/products/:productID"
              Component={() => <EachProduct content={content} token={token}/>}
            />
            <Route
              path="/profile"
              Component={() => <Profile content={content} />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
