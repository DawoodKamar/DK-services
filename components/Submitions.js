import React, { useEffect, useState } from "react";
import styles from "../styles/submitions.module.css";
import Link from "next/link";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import UserCount from "./UserCount";

export default function Submitions() {
  const { isLoaded, isSignedIn, user } = useUser();
  const userId = user && user.id;
  const ITEMS_PER_PAGE = 10;
  //----------------------------------------paginations--------------------------------
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Data fetching function that considers pagination
  function fetchData(page = 1) {
    const endpoint = page
      ? `/api/dk-services?userId=${userId}&page=${page}&limit=${ITEMS_PER_PAGE}`
      : `/api/dk-services?userId=${userId}`;

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        setWorkOrders(data.results); // Assuming your backend returns an object with a "results" key
        setTotalPages(data.totalPages); // And also a "totalPages" key to inform how many pages there are in total
      })
      .catch((error) => console.error("Error:", error));
  }

  useEffect(() => {
    if (!userId) return;
    fetchData(currentPage);
  }, [userId, currentPage]);

  //---------------------------------------list of wo---------------------------------

  // useState is a React hook that lets you add state to functional components.
  // Here, it is used to declare a state variable `workOrders` and a function `setWorkOrders` to update it. Initially, workOrders is an empty array.
  const [workOrders, setWorkOrders] = useState([]);

  //----------------------------------handle search request-----------------------------

  // Declare a new state variable `searchTerm` that will hold the user's search term,
  // and a `setSearchTerm` function that will be used to change `searchTerm`.
  // The `useState` hook is initially set to an empty string ("").
  const [searchTerm, setSearchTerm] = useState("");

  // Declare a function `handleSearch` that will be used to perform the search operation.
  function handleSearch() {
    // Make a fetch request to the server's search API endpoint.
    // The `searchTerm` is included as a query parameter in the URL.
    fetch(`/api/dk-services?search=${searchTerm}&userId=${userId}`)
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
        setWorkOrders(data.results)
      )
      // If any error occurs during the fetch or parsing operations, log it to the console.
      .catch((error) => console.error("Error:", error));
  }

  // Use the `useEffect` hook to call `handleSearch` whenever the `searchTerm` changes.
  // This means that a new search will be performed whenever the user types something new.
  useEffect(() => {
    if (searchTerm) handleSearch();
  }, [searchTerm]);

  // Declare a function `clearSearch` that will be used to clear the search term.
  // It does this by setting `searchTerm` to an empty string.
  // This will cause `useEffect` to run `handleSearch` again (since `searchTerm` has changed),
  // which will fetch all work orders again (since the search term is now empty).
  const clearSearch = () => {
    setSearchTerm("");
  };
  // Pagination controls
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  if (!isLoaded || !isSignedIn) {
    return <RedirectToSignIn />;
  }

  //--------------------------------html--------------------------------------
  return (
    <>
      <UserCount userId={userId} />
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
        {workOrders.length === 0 ? (
          // This is the div that will be displayed when there are no work orders
          <div className={styles.empty}>
            No work orders submitted yet! You can get started by clicking the
            New Workorder button.
          </div>
        ) : (
          workOrders.map((workOrder) => {
            const dateObject = new Date(workOrder.jobDate); // Convert string to date object
            const formattedDate = dateObject.toDateString();

            return (
              <Link
                href={`/work-orders/${workOrder.id}`}
                className={styles.link}
                key={workOrder.id}
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
          })
        )}
      </ul>
      <div className={styles.pagination}>
        <button
          className={styles.pageButtons}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className={styles.page}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={styles.pageButtons}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </>
  );
}
