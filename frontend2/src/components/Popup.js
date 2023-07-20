import React from "react";

const Popup = () => {
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
          <button type="submit" className="parentbutton button-33">
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default Popup;
