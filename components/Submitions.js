import React, { useEffect, useState } from "react";
import styles from "../styles/submitions.module.css";

export default function Submitions() {
  // useState is a React hook that lets you add state to functional components.
  // Here, it is used to declare a state variable `workOrders` and a function `setWorkOrders` to update it. Initially, workOrders is an empty array.
  const [workOrders, setWorkOrders] = useState([]);

  // useEffect is a React hook that allows you to perform side effects in function components. Side effects could be data fetching, subscriptions or manually changing the DOM, etc.
  // Here, it is used to fetch data from the server when the component mounts (i.e., when it is first rendered).
  useEffect(() => {
    // Fetching the data from the server-side route "/api/dk-services".
    fetch("/api/dk-services")
      .then((response) => {
        // If the server response is not OK (status code not in the range 200-299), an error is thrown.
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // If the server response is OK, it is converted to JSON.
        // This is an asynchronous operation because the full response may not have been received yet.
        return response.json();
      })
      // The JSON data received from the server is then used to update the state variable `workOrders`.
      .then((data) => setWorkOrders(data))
      // If there is an error (either in fetching or in converting the response to JSON), it is caught here and logged to the console.
      .catch((error) => console.error("Error:", error));
    // The second argument to useEffect is an empty array, which means the effect runs only once after the first render.
  }, []);

  return (
    <ul className={styles.list}>
      {/* Here, the state variable `workOrders` (which is an array of work order objects) is mapped over.
            For each work order, a list item element is created, displaying the work order number and the unit number.
            The `key` prop is used by React for optimization purposes when rendering lists. */}
      {workOrders.map((workOrder) => {
        const dateObject = new Date(workOrder.jobDate); // Convert string to date object
        const formattedDate = dateObject.toDateString();

        return (
          <li key={workOrder.id} className={styles.listItem}>
            <div className={styles.workOrderInfo}>
              <h4 className={styles.workOrderNumber}>
                {workOrder.workOrderNumber}
              </h4>
              <h5 className={styles.unitNumber}>Unit {workOrder.unitNumber}</h5>
            </div>
            <h4 className={styles.date}>{formattedDate}</h4>
          </li>
        );
      })}
    </ul>
  );
}
