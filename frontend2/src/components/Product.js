import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Product() {
  const [productname, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState([]);
  const [inputcategory, setInputcategory] = useState(1);

  const [navigate, setNavigate] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch("http://localhost:8000/category");
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", productname);
    formData.append("category", inputcategory);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("quantity", quantity);
    formData.append("image", image);

    const response = await fetch("http://localhost:8000/product", {
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const content = await response.json();
    console.log(content);

    setNavigate(true);
  };

  if (navigate) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="ListForm">
        <h1>List Your Product</h1>
        <br />
        <select
          id="category"
          name="category"
          onChange={(e) => {
            setInputcategory(e.target.value);
            console.log(inputcategory);
          }}
          className="parentbutton button-35"
        >
          <option value="">Select Appropriate Category</option>
          {category.map((cat) => (
            <option value={cat.id}>{cat.category_name}</option>
          ))}
        </select>
        <br />
        <input
          type="text"
          placeholder="Product Name"
          onChange={(e) => setProductName(e.target.value)}
          className="InputField"
        />
        <br />
        <input
          type="number"
          placeholder="Product Price"
          onChange={(e) => setPrice(e.target.value)}
          className="InputField"
        />
        <br />
        <input
          type="text"
          placeholder="Product Description"
          onChange={(e) => setDescription(e.target.value)}
          className="InputField"
        />
        <br />
        <input
          type="number"
          placeholder="Product Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          className="InputField"
        />
        <br />
        <input
          type="file"
          name="image"
          placeholder="Product Image"
          onChange={handleImageChange}
          className="FileField"
        />
        <br />
        <button type="submit" className="button-33 parentbutton">
          List Item
        </button>
      </form>
    </div>
  );
}
