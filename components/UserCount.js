import React, { useEffect, useState } from "react";

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

  if (!userData) return <div>Loading...</div>;

  return <div>You have {userData.submissionCount} submissions</div>;
}
