import "./App.css";
import Nav from "./components/Nav";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { useState, useEffect } from "react";
import Product from "./components/Product";
import EachProduct from "./components/EachProduct";
import Profile from "./components/Profile";


function App() {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await fetch("http://localhost:8000/", {
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setName(content.name);
    })();
  });

  return (
    <div className="App">
      <BrowserRouter>
        <Nav name={name} setName={setName}  />
        <main className="form-signin">
          <Routes>
            <Route path="/" Component={() => <Home name={name} />} />
            <Route path="/login" Component={() => <Login setName={setName}/>} />
            <Route path="/register" Component={Register} />
            <Route path="/list" Component={Product} />
            <Route path="/products/:productID" Component={EachProduct}/>
            <Route path="/profile" Component={() =>  <Profile data={content}/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
