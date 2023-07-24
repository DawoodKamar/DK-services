import Layout from "../../components/layout";
import styles from "../../styles/workOrderForm.module.css"; //----------------------------------------------------------------
import Shortcuts from "../../components/shortcuts";
import React, { useState, useEffect } from "react";

export default function EditWorkOrder({ workOrderData }) {
  const initialFormState = {
    workOrderNumber: parseInt(workOrderData.workOrderNumber),
    jobDate: new Date(workOrderData.jobDate).toISOString().split("T")[0],
    client: workOrderData.client,
    address: workOrderData.address,
    city: workOrderData.city,
    unitNumber: workOrderData.unitNumber,
    vin: workOrderData.vin,
    licensePlate: workOrderData.licensePlate,
    hubometer: workOrderData.hubometer,
    totalHours: workOrderData.totalHours,
    descriptions: workOrderData.descriptions,
    parts: workOrderData.parts,
  };

  const [formState, setFormState] = useState(initialFormState);
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  //------------------------------------submit logic--------------------------------
  const handleSubmit = (event) => {
    event.preventDefault();

    // Strip off the workOrderId from descriptions and parts
    const descriptions = formState.descriptions.map(
      ({ workOrderId, ...rest }) => rest
    );
    const parts = formState.parts.map(({ workOrderId, ...rest }) => rest);

    const dataToSend = { ...formState, descriptions, parts };

    fetch(`/api/work-orders/${formState.workOrderNumber}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return fetch("/api/dk-services", {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        });
      })
      .then((response) => {
        if (!response.ok) throw new Error(response.statusText);
        return response.json();
      })
      .then(() => {
        setFormState(initialFormState);
      })
      .catch((error) => console.error("Error:", error));
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // First, delete the existing work order
  //   fetch(`/api/work-orders/${formState.workOrderNumber}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => {
  //       // The response of the fetch request is a Stream object. We're checking to make sure the request was successful. If it wasn't, we throw an error.
  //       if (!response.ok) throw new Error(response.statusText);
  //       // If the delete was successful, we'l l make a POST request to create a new work order.
  //       return fetch("/api/dk-services", {
  //         method: "POST", // The method of the request is set to "POST".
  //         // The body of the request is set to the JSON string representation of the form state. This is the data you're sending through the request.
  //         body: JSON.stringify(formState),
  //         // The headers of the request are being set. "Content-Type" is being set to "application/json", which tells the server that we're sending JSON data.
  //         headers: { "Content-Type": "application/json" },
  //       });
  //     })
  //     .then((response) => {
  //       // Check if the POST was successful.
  //       if (!response.ok) throw new Error(response.statusText);
  //       // If the response was okay, we return the JSON data of the response. This is another Promise.
  //       return response.json();
  //     })
  //     .then(() => {
  //       // After the JSON data has been received and processed, we reset the form to its initial state.
  //       setForm(initialForm);
  //     })
  //     // If there were any errors in the above steps, they will be caught and logged here.
  //     .catch((error) => console.error("Error:", error));
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   fetch(`/api/work-orders/${formState.workOrderNumber}`, {
  //     method: "DELETE",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => {
  //       if (!response.ok) throw new Error(response.statusText);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Deleted work order: ", data);
  //       // Reset the form or perform other actions after successful deletion
  //       setForm(initialForm);
  //     })
  //     .catch((error) => console.error("Error:", error));
  // };
  //------------------handle description change-----------------------------

  const handleAddDescription = () => {
    setFormState((prevState) => ({
      ...prevState,
      descriptions: [...prevState.descriptions, { description: "", time: "" }],
    }));
  };

  const handleDescriptionChange = (e, index) => {
    const newDescriptions = [...formState.descriptions];
    newDescriptions[index].description = e.target.value;
    setFormState((prevState) => ({
      ...prevState,
      descriptions: newDescriptions,
    }));
    updateStateAndCalculateTotalHours(newDescriptions);
  };

  const handleTimeChange = (e, index) => {
    const newDescriptions = [...formState.descriptions];
    newDescriptions[index].time = parseFloat(e.target.value) || 0;
    setFormState((prevState) => ({
      ...prevState,
      descriptions: newDescriptions,
    }));
    updateStateAndCalculateTotalHours(newDescriptions);
  };

  const handleRemoveDescription = (index) => {
    const newDescriptions = [...formState.descriptions];
    newDescriptions.splice(index, 1);
    setFormState((prevState) => ({
      ...prevState,
      descriptions: newDescriptions,
    }));
    updateStateAndCalculateTotalHours(newDescriptions);
  };

  //------------------handle part change-----------------------------
  const handleAddPart = () => {
    setFormState((prevState) => ({
      ...prevState,
      parts: [...prevState.parts, { quantity: "1", part: "" }],
    }));
  };

  const handlePartChange = (e, index) => {
    const newParts = [...formState.parts];
    newParts[index].part = e.target.value;
    setFormState((prevState) => ({ ...prevState, parts: newParts }));
  };

  const handleRemovePart = (index) => {
    const newParts = [...formState.parts];
    newParts.splice(index, 1);
    setFormState((prevState) => ({ ...prevState, parts: newParts }));
  };

  const handleQuantityChange = (e, index) => {
    const newParts = [...formState.parts];
    newParts[index].quantity = e.target.value;
    setFormState((prevState) => ({ ...prevState, parts: newParts }));
  };

  //------------------handle total hours-----------------------------
  const updateStateAndCalculateTotalHours = (newDescriptions) => {
    const total = newDescriptions.reduce(
      (sum, item) => sum + parseFloat(item.time || 0),
      0
    );
    setFormState((prevState) => ({
      ...prevState,
      descriptions: newDescriptions,
      totalHours: total,
    }));
  };

  return (
    <Layout>
      <Shortcuts />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1>Work Order Form</h1>
        <hr />
        <label>
          Work Order Number:
          <input
            type="number"
            name="workOrderNumber"
            onChange={handleChange}
            value={formState.workOrderNumber}
          />
        </label>
        <label>
          Job Date:
          <input
            type="date"
            name="jobDate"
            value={formState.jobDate}
            onChange={handleChange}
          />
        </label>
        <label>
          Client:
          <input
            type="text"
            name="client"
            onChange={handleChange}
            value={formState.client}
          />
        </label>
        <label>
          Address:
          <input
            type="text"
            name="address"
            onChange={handleChange}
            value={formState.address}
          />
        </label>

        <label>
          City:
          <input
            type="text"
            name="city"
            onChange={handleChange}
            value={formState.city}
          />
        </label>
        <label>
          Unit Number:
          <input
            type="text"
            name="unitNumber"
            onChange={handleChange}
            value={formState.unitNumber}
          />
        </label>
        <label>
          VIN:
          <input
            type="text"
            name="vin"
            onChange={handleChange}
            value={formState.vin}
          />
        </label>
        <label>
          License Plate:
          <input
            type="text"
            name="licensePlate"
            onChange={handleChange}
            value={formState.licensePlate}
          />
        </label>
        <label>
          Hubometer:
          <input
            type="text"
            name="hubometer"
            onChange={handleChange}
            value={formState.hubometer}
          />
        </label>
        <p>Description</p>
        {formState.descriptions &&
          formState.descriptions.map((description, index) => (
            <DescriptionInput
              key={index}
              description={description.description}
              time={description.time}
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
          {formState.parts &&
            formState.parts.map((part, index) => (
              <PartsInput
                key={index}
                parts={part.part}
                quantity={part.quantity}
                index={index}
                handleQuantityChange={(e) => handleQuantityChange(e, index)}
                handlePartChange={(e) => handlePartChange(e, index)}
                handleRemove={() => handleRemovePart(index)}
              />
            ))}
        </label>
        <button type="button" onClick={handleAddPart}>
          Add Part
        </button>

        <label>
          Total Hours:
          <input
            type="number"
            name="totalHours"
            value={formState.totalHours}
            onChange={handleChange}
            readOnly
          />
        </label>
        <button type="submit">Update Work Order</button>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Get the workOrderNumber from the context
  const { workOrderNumber } = context.params;

  // Fetch the data from the server-side route "/api/work-orders/[workOrderNumber]"
  const res = await fetch(
    `http://localhost:3000/api/work-orders/${workOrderNumber}`
  );

  // Verify that the server response contains data before attempting to parse it
  if (!res.ok) {
    return {
      notFound: true,
    };
  }

  const data = await res.json();

  // The fetched data will be passed into your page component as props
  return {
    props: { workOrderData: data },
  };
}

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
  quantity,
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
          value={quantity}
          name={`quantity${index}`}
          onChange={handleQuantityChange}
        />
      </label>
      <label>
        Part:
        <input
          type="text"
          name={`part${index}`}
          value={parts}
          onChange={handlePartChange}
        />
      </label>
      <button type="button" onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
