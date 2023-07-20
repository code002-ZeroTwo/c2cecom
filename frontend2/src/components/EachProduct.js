import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ReactModal from "react-modal";
import Popup from "./Popup";

const EachProduct = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const productData = location.state;
  console.log(productData);

  const decodedImage = (codedval) => {
    const decoded = atob(codedval);
    const byteArray = new Uint8Array(decoded.length);
    for (let i = 0; i < decoded.length; i++) {
      byteArray[i] = decoded.charCodeAt(i);
    }

    // Create a Blob object from the Uint8Array
    const blob = new Blob([byteArray], { type: "image/png" });

    // Use the blob as needed, for example, to display the image
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  };
  return (
    <>
      <div className="Heading">
        <h1>{productData.name}</h1>
      </div>
      <div className="EachProduct">
        <img src={decodedImage(productData.image)} className="image" />
        <div className="Description">
          <h3>Description</h3>
          <hr />
          <p>{productData.description}</p>
          <div className="OtherDetails">
            <h3>Other Details</h3>
            <hr />
            <p>Category: {productData.category}</p>
            <p>Price: {productData.price}</p>
            <p>listed_by: {productData.listed_by}</p>
          </div>
        </div>
      </div>
      <div>
        <button className="Buy button-34 parentbutton" onClick={setIsOpen}>
          Buy it
        </button>
        <ReactModal
          isOpen={isOpen}
          contentLabel="Buy Sell"
          onRequestClose={() => setIsOpen(false)}
          className="custom-modal"
        >
          <Popup />
          <button onClick={() => setIsOpen(false)} className="button-33 parentbutton xpos">
            X
          </button>
        </ReactModal>
      </div>
    </>
  );
};

export default EachProduct;
