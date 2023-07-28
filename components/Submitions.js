import React, { useEffect, useState } from "react";
import styles from "../styles/submitions.module.css";
import Link from "next/link";

export default function Submitions() {
  //---------------------------------------list of wo---------------------------------

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

  //----------------------------------handle search request-----------------------------

  // Declare a new state variable `searchTerm` that will hold the user's search term,
  // and a `setSearchTerm` function that will be used to change `searchTerm`.
  // The `useState` hook is initially set to an empty string ("").
  const [searchTerm, setSearchTerm] = useState("");

  // Declare a function `handleSearch` that will be used to perform the search operation.
  function handleSearch() {
    // Make a fetch request to the server's search API endpoint.
    // The `searchTerm` is included as a query parameter in the URL.
    fetch(`/api/dk-services?search=${searchTerm}`)
      .then((response) => {
        // Check if the server's response is okay.
        // If it's not okay (e.g. the server responded with an error status), throw an error.
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // If the server's response is okay, parse the response body from JSON to a JavaScript object.
        return response.json();
      })
      .then((data) =>
        // After parsing the response data, use it to update the `workOrders` state variable.
        // This will cause the component to re-render with the new search results.
        setWorkOrders(data)
      )
      // If any error occurs during the fetch or parsing operations, log it to the console.
      .catch((error) => console.error("Error:", error));
  }

  // Use the `useEffect` hook to call `handleSearch` whenever the `searchTerm` changes.
  // This means that a new search will be performed whenever the user types something new.
  useEffect(() => {
    handleSearch();
  }, [searchTerm]);

  // Declare a function `clearSearch` that will be used to clear the search term.
  // It does this by setting `searchTerm` to an empty string.
  // This will cause `useEffect` to run `handleSearch` again (since `searchTerm` has changed),
  // which will fetch all work orders again (since the search term is now empty).
  const clearSearch = () => {
    setSearchTerm("");
  };

  //--------------------------------html--------------------------------------
  return (
    <>
      <div className={styles.searchContainer}>
        <input
          className={styles.searchTerm}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={handleSearch} className={styles.search}>
          Search
        </button>
        <button onClick={clearSearch} className={styles.clearSearch}>
          Clear Search
        </button>
      </div>
      <ul className={styles.list}>
        {/* Here, the state variable `workOrders` (which is an array of work order objects) is mapped over.
            For each work order, a list item element is created, displaying the work order number and the unit number.
            The `key` prop is used by React for optimization purposes when rendering lists. */}
        {workOrders.map((workOrder) => {
          const dateObject = new Date(workOrder.jobDate); // Convert string to date object
          const formattedDate = dateObject.toDateString();

          return (
            <Link
              href={`/work-orders/${workOrder.workOrderNumber}`}
              key={workOrder.id}
              className={styles.link}
            >
              <li key={workOrder.id} className={styles.listItem}>
                <div className={styles.workOrderInfo}>
                  <h4 className={styles.workOrderNumber}>
                    {workOrder.workOrderNumber}
                  </h4>
                  <h5 className={styles.unitNumber}>
                    Unit {workOrder.unitNumber}
                  </h5>
                </div>
                <h4 className={styles.date}>{formattedDate}</h4>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}
