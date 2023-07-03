import React, { useState } from "react";

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
    description: "",
    parts: "",
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
    // Add your form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Work Order Form</h1>
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
        Street Address:
        <input type="text" name="streetAddress" onChange={handleChange} />
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
      <label>
        Description:
        <textarea name="description" onChange={handleChange} />
      </label>
      <label>
        Parts:
        <textarea name="parts" onChange={handleChange} />
      </label>
      <label>
        Total Hours:
        <input type="number" name="totalHours" onChange={handleChange} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
