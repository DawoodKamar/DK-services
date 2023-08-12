import Link from "next/link";
import styles from "../styles/shortcuts.module.css";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { UserContext } from "../components/UserProvider";

export default function Shortcuts({ id, displayMode }) {
  console.log("Shortcuts component rendered");
  const router = useRouter();

  const { hasReachedLimit, refreshUserData } = useContext(UserContext);
  refreshUserData();

  if (displayMode === "Edit") {
    const handleDelete = () => {
      // Making a fetch request to the server to delete an existing work order.
      // The URL includes the work order number from the form state.
      // We're specifying that this should be a DELETE request by setting the `method` property to "DELETE".
      fetch(`/api/work-orders/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      })
        .then((response) => {
          // If the server responds with an error status, we throw an error to be caught in the catch block.
          if (!response.ok) throw new Error(response.statusText);
          return console.log("Work order deleted");
          //add feedback to the response
        })
        .then(() => {
          router.push("/WorkOrderList"); // Redirect to the target route
        })
        .catch((error) => console.error("Error:", error));
    };
    console.log(hasReachedLimit);
    return (
      <div className={styles.shortcuts}>
        <Link href="/WorkOrder">
          <button className={styles.buttons} disabled={hasReachedLimit}>
            New Work order
          </button>
        </Link>
        <Link href="/WorkOrderList">
          <button className={styles.buttons}>Submissions</button>
        </Link>
        <Link href={`/edit/${id}`}>
          <button className={styles.buttons}>Edit Work order</button>
        </Link>
        <Link href={"#"}>
          <button
            className={`${styles.buttons} ${styles.delete}`}
            onClick={handleDelete}
          >
            Delete
          </button>
        </Link>
      </div>
    );
  } else console.log(hasReachedLimit);
  return (
    <div className={styles.shortcuts}>
      <Link href="/WorkOrder">
        <button className={styles.buttons} disabled={hasReachedLimit}>
          New Workorder
        </button>
      </Link>
      <Link href="/WorkOrderList">
        <button className={styles.buttons}>Submissions</button>
      </Link>
    </div>
  );
}
