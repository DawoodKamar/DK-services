import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/workOrderForm.module.css";

//--------------------------------------growing text area component----------------------------------------------------------
function GrowingTextarea({ value, onChange, ...props }) {
  const textareaRef = React.useRef(null);

  () => {
    const textarea = textareaRef.current; // Reset the height to auto to shrink
    textarea.style.height = "auto"; // Set the height to the scrollHeight so it grows
    textarea.style.height = textarea.scrollHeight + "px";
  };
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={onChange}
      {...props}
      style={{ overflow: "hidden", resize: "none" }}
    />
  );
}

//--------------------------------------description component----------------------------------------------------------
function DescriptionInput({
  description,
  time,
  index,
  handleDescriptionChange,
  handleTimeChange,
  handleRemove,
}) {
  return (
    <div className={styles.description}>
      <label>
        {index + 1}:
        <GrowingTextarea
          value={description}
          name={`description${index}`}
          onChange={(e) => handleDescriptionChange(e, index)}
        />
      </label>
      <label>
        Time:
        <input
          type="number"
          step="0.25"
          value={time}
          name={`time${index}`}
          onChange={handleTimeChange}
        />
      </label>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}

//--------------------------------------parts component----------------------------------------------------------

function PartsInput({
  parts,
  index,
  handleQuantityChange,
  handlePartChange,
  handleRemove,
}) {
  return (
    <div>
      <label>
        Quantity:
        <input
          type="text"
          value={parts}
          name={`quantity${index}`}
          onChange={handleQuantityChange}
        />
      </label>
      <label>
        Part:
        <input type="text" name={`part${index}`} onChange={handlePartChange} />
      </label>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
//-------------------------------form state----------------================================

export default function WorkOrderForm() {
  //  The initial state is an object with keys for each input in the form,
  // and empty string values for each key. The jobDate key is initialized with the current date
  const [form, setForm] = useState({
    workOrderNumber: "",
    jobDate: new Date().toISOString().split("T")[0], //gets the current date in ISO 8601 format then split the date by "date and then time" and get the first element ("date")
    client: "",
    address: "",
    streetAddress: "",
    city: "",
    unitNumber: "",
    vin: "",
    licensePlate: "",
    hubometer: "",
    descriptions: [{ description: "", time: "" }],
    parts: [{ quantity: "1", part: "" }],
    totalHours: "",
  });
  //{ ...form }: This is using the spread syntax (...) to create a new object that has all the same properties as our current form state object.
  //never directly modify our state. Instead, we create a new object with the changes we want, and then set that as the new state.
  //e.target.name is the name attribute of that element, and e.target.value is the current value of that element.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    // Add submission logic here
  };
  //------------------handle description change-----------------------------

  const handleAddDescription = () => {
    setForm({
      ...form,
      descriptions: [...form.descriptions, { description: "", time: "" }],
    });
  };

  const handleDescriptionChange = (e, index) => {
    const newDescriptions = [...form.descriptions];
    newDescriptions[index].description = e.target.value;
    setForm({ ...form, descriptions: newDescriptions });
    updateStateAndCalculateTotalHours(newDescriptions);
  };

  const handleTimeChange = (e, index) => {
    const newDescriptions = [...form.descriptions];
    newDescriptions[index].time = parseFloat(e.target.value) || 0;
    setForm({ ...form, descriptions: newDescriptions });
    updateStateAndCalculateTotalHours(newDescriptions);
  };

  const handleRemoveDescription = (index) => {
    const newDescriptions = [...form.descriptions];
    newDescriptions.splice(index, 1);
    setForm({ ...form, descriptions: newDescriptions });
    updateStateAndCalculateTotalHours(newDescriptions);
  };

  //------------------handle part change-----------------------------
  const handleAddPart = () => {
    setForm({
      ...form,
      parts: [...form.parts, { quantity: "1", part: "" }],
    });
  };

  const handlePartChange = (e, index) => {
    const newParts = [...form.parts];
    newParts[index].part = e.target.value;
    setForm({ ...form, parts: newParts });
  };

  const handleRemovePart = (index) => {
    const newParts = [...form.parts];
    newParts.splice(index, 1);
    setForm({ ...form, parts: newParts });
  };

  const handleQuantityChange = (e, index) => {
    const newParts = [...form.parts];
    newParts[index].quantity = e.target.value;
    setForm({ ...form, parts: newParts });
  };
  //------------------handle total hours-----------------------------
  const updateStateAndCalculateTotalHours = (newDescriptions) => {
    const total = newDescriptions.reduce(
      (sum, item) => sum + parseFloat(item.time || 0),
      0
    );
    setForm({ ...form, descriptions: newDescriptions, totalHours: total });
  };

  //------------------------form-----------------------

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Work Order Form</h1>
      <hr />
      <label>
        Work Order Number:
        <input type="number" name="workOrderNumber" onChange={handleChange} />
      </label>
      <label>
        Job Date:
        <input
          type="date"
          name="jobDate"
          value={form.jobDate}
          onChange={handleChange}
        />
      </label>
      <label>
        Client:
        <input type="text" name="client" onChange={handleChange} />
      </label>
      <label>
        Address:
        <input type="text" name="address" onChange={handleChange} />
      </label>

      <label>
        City:
        <input type="text" name="city" onChange={handleChange} />
      </label>
      <label>
        Unit Number:
        <input type="text" name="unitNumber" onChange={handleChange} />
      </label>
      <label>
        VIN:
        <input type="text" name="vin" onChange={handleChange} />
      </label>
      <label>
        License Plate:
        <input type="text" name="licensePlate" onChange={handleChange} />
      </label>
      <label>
        Hubometer:
        <input type="text" name="hubometer" onChange={handleChange} />
      </label>
      <p>Description</p>
      {form.descriptions.map((item, index) => (
        <DescriptionInput
          key={index}
          description={item.description}
          time={item.time}
          index={index}
          handleDescriptionChange={(e) => handleDescriptionChange(e, index)}
          handleTimeChange={(e) => handleTimeChange(e, index)}
          handleRemove={() => handleRemoveDescription(index)}
        />
      ))}
      <button type="button" onClick={handleAddDescription}>
        Add Description
      </button>
      <p>Parts</p>
      <label>
        {form.parts.map((item, index) => (
          <PartsInput
            key={index}
            index={index}
            parts={item.quantity}
            quantity={item.quantity}
            handlePartChange={(e) => handlePartChange(e, index)}
            handleQuantityChange={(e) => handleQuantityChange(e, index)}
            handleRemove={() => handleRemovePart(index)}
          />
        ))}
      </label>
      <button type="button" onClick={handleAddPart}>
        Add Part
      </button>
      {/* Parts:
        <textarea name="parts" onChange={handleChange} /> */}

      <label>
        Total Hours:
        <input
          type="number"
          name="totalHours"
          value={form.totalHours}
          onChange={handleChange}
          readOnly
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
