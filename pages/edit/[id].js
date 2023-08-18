import Layout from "../../components/layout";
import styles from "../../styles/workOrderForm.module.css"; //----------------------------------------------------------------
import Shortcuts from "../../components/Shortcuts";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";

export default function EditWorkOrder({ workOrderData }) {
  const { isLoaded, isSignedIn, user } = useUser();

  const userId = user && user.id;

  const initialFormState = {
    id: parseInt(workOrderData.id),
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
    userId,
  };

  const [formState, setFormState] = useState(initialFormState);
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  if (!isLoaded || !isSignedIn) {
    <RedirectToSignIn />;
  }
  //------------------------------------submit logic--------------------------------
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();

    // Map over the descriptions in the form state, removing the `workOrderId` from each object.
    // We're using object destructuring to achieve this.
    // `workOrderId` gets its own variable, and `...rest` represents the rest of the properties in the object.
    // Because we're only using `...rest` in the returned object, `workOrderId` gets omitted.
    const descriptions = formState.descriptions.map(
      ({ workOrderId, ...rest }) => rest
    );

    // Doing the same thing for parts as we did for descriptions.
    const parts = formState.parts.map(({ workOrderId, ...rest }) => rest);

    // Constructing a new object to send to the server. This is based on the form state,
    // but we're replacing the `descriptions` and `parts` arrays with the ones we just created,
    // which don't include the `workOrderId` property in their objects.
    const dataToSend = { ...formState, descriptions, parts };

    // Making a fetch request to the server to delete an existing work order.
    // The URL includes the work order number from the form state.
    // We're specifying that this should be a DELETE request by setting the `method` property to "DELETE".
    fetch(`/api/work-orders/${formState.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // If the server responds with an error status, we throw an error to be caught in the catch block.
        if (!response.ok) throw new Error(response.statusText);

        // If the server responded successfully, we make another fetch request.
        // This time, we're making a POST request to a different URL, and we're sending `dataToSend` as the request body.
        // We're stringifying `dataToSend` because the server expects to receive a string, not a JavaScript object.
        return fetch("/api/dk-services", {
          method: "POST",
          body: JSON.stringify(dataToSend),
          headers: { "Content-Type": "application/json" },
        });
      })
      .then((response) => {
        // Again, if the server responds with an error status, we throw an error to be caught in the catch block.
        if (!response.ok) throw new Error(response.statusText);

        // If the server responded successfully, we parse the response body as JSON.
        // This returns a Promise that resolves with the parsed JSON data.
        return response.json();
      })
      .then(() => {
        router.push("/WorkOrderList"); // Redirect to the target route
      })
      .catch((error) => {
        // If an error was thrown at any point in the above code, it gets caught here.
        // We're logging the error to the console.
        console.error("Error:", error);
      });
  };
  //------------------------------handle submit as new -------------------------------------
  // This function is triggered when the form is submitted as a new work order.
  const handleSubmitAsNew = (event) => {
    // We prevent the default form submission event to avoid a page refresh.
    event.preventDefault();

    // We destructure the formState object into individual properties.
    // The 'id', 'descriptions', and 'parts' properties are extracted separately,
    // and the rest of the properties (e.g., workOrderNumber, jobDate, client, etc.) are stored in 'rest'.
    const { id, descriptions, parts, ...rest } = formState;

    // For each item in the 'descriptions' array, we create a new object that includes all properties
    // except for 'id' and 'workOrderId'. This effectively removes 'id' and 'workOrderId' from each item.
    const newDescriptions = descriptions.map(
      ({ id, workOrderId, ...rest }) => rest
    );

    // We do the same for each item in the 'parts' array.
    const newParts = parts.map(({ id, workOrderId, ...rest }) => rest);

    // We construct the data that will be sent to the server. This includes all properties from 'rest',
    // as well as our newly created 'descriptions' and 'parts' arrays.
    const dataToSend = {
      ...rest,
      descriptions: newDescriptions,
      parts: newParts,
    };

    // We send a POST request to the server with our data. The data is converted to a JSON string
    // and included in the body of the request.
    fetch("/api/dk-services", {
      method: "POST",
      body: JSON.stringify(dataToSend),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        // If the server responds with a status that indicates an error (not ok), we throw an error.
        if (!response.ok) throw new Error(response.statusText);

        // If the server responds with a status that indicates success (ok),
        // we convert the response body to a JavaScript object (or array).
        return response.json();
      })
      .then(() => {
        router.push("/WorkOrderList"); // Redirect to the target route
      })
      .catch((error) => {
        // If there's any error during this process, we log the error to the console.
        console.error("Error:", error);
      });
  };

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
        <div className={styles.submitButtons}>
          <button type="submit" className={styles.update}>
            Update Work Order
          </button>
          <button
            type="button"
            onClick={handleSubmitAsNew}
            className={styles.new}
          >
            Submit as New Work Order
          </button>
        </div>
      </form>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  // Get the id from the context
  const { id } = context.params;
  const { req } = context;

  // Determine the base URL
  const protocol = req.headers["x-forwarded-proto"] || "http";
  const baseUrl = `${protocol}://${req.headers.host}`;

  // Fetch the data from the server-side route "/api/work-orders/[id]"
  const res = await fetch(`${baseUrl}/api/work-orders/${id}`);

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
