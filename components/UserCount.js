import React, { useEffect, useState } from "react";
import styles from "../styles/submitions.module.css";

export default function UserCount({ userId }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Fetch user data when the component mounts
    fetch(`/api/user/${userId}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [userId]);
  if (userData === null)
    return (
      <>
        <div className={styles.empty}>
          This is for demo purposes only, you are limited to 10 work order
          submissions
        </div>
        <br></br>
      </>
    );
  if (!userData) return <div className={styles.empty}>Loading...</div>;
  if (userData.submissionLimit === 10000)
    return (
      <div className={styles.empty}>{userData.submissionCount} Submissions</div>
    );
  return (
    <>
      <div className={styles.empty}>
        {userData.submissionCount}/{userData.submissionLimit} Submissions
      </div>
    </>
  );
}
