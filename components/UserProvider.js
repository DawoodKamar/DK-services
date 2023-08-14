// import React, { createContext, useState, useEffect } from "react";
// import { useUser } from "@clerk/nextjs";

// // Create the UserContext
// const UserContext = createContext({
//   userDatas: null,
//   hasReachedLimit: false,
//   setUserDatas: () => {},
//   checkSubmissionLimit: () => {},
// });

// function UserProvider({ children }) {
//   const [userDatas, setUserDatas] = useState(null);
//   const [hasReachedLimit, setHasReachedLimit] = useState(false);
//   const { user } = useUser();
//   const userId = user && user.id;

//   useEffect(() => {
//     // Fetch user data when the component mounts
//     fetch(`/api/user/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUserDatas(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   }, [userId]);
//   const refreshUserData = () => {
//     // Fetch user data
//     fetch(`/api/user/${userId}`)
//       .then((response) => response.json())
//       .then((data) => {
//         setUserDatas(data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data:", error);
//       });
//   };

//   const checkSubmissionLimit = () => {
//     if (userDatas && userDatas.submissionCount >= userDatas.submissionLimit) {
//       console.log("Limit reached!");
//       setHasReachedLimit(true);
//     } else {
//       setHasReachedLimit(false);
//     }
//   };
//   useEffect(() => {
//     checkSubmissionLimit();
//   }, [userDatas]);
//   // Provide the context values
//   const contextValues = {
//     userDatas,
//     setUserDatas,
//     hasReachedLimit,
//     checkSubmissionLimit,
//     refreshUserData,
//   };

//   return (
//     <UserContext.Provider value={contextValues}>
//       {children}
//     </UserContext.Provider>
//   );
// }

// export { UserProvider, UserContext };
