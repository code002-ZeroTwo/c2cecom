import React, { useState } from "react";

const Popup = (props) => {
  const ProceedTransaction = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("ordered_by", props.content.id);
    formData.append("ordered_item", props.product.product_id);

    console.log(props);
    console.log(props.product);
    //now make a put request to server decreasing the quantity by one
    //by the respective user.
    const response = await fetch("http://127.0.0.1:8000/order", {
      headers: { Authorization: `Bearer ${props.token}` },
      method: "POST",
      credentials: "include",
      body: formData,
    });

    const content = await response.json();
    console.log(content);
    props.setProductQuantity(content.quantity);
    if(content.success === "success") {
      props.setBought(true);
    }
    props.setIsOpen(false);
  };

  return (
    <div className="popupdiv-container">
      <form className="popupdiv">
        <h2>Select Payment Method</h2>
        <div className="Radiobuttons">
          <input type="radio" id="option1" name="options" value="cash" />
          <label for="option1"> Pay In Cash</label>
          <br />
          <input type="radio" id="option2" name="options" value="khalti" />
          <label for="option2"> Khalti Payment</label>
          <br />
        </div>
        <div>
          <button
            type="submit"
            className="parentbutton button-33"
            onClick={(e) => ProceedTransaction(e)}
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
