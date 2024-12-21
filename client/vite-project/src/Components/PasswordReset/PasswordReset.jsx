// import { useState } from "react";
// import axios from "axios";

// function PasswordReset() {
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       // Replace with your server endpoint
//       const url = "http://localhost:3000/passwordResetController";
      
//       const token = localStorage.getItem("authToken"); // Assumes the token is stored in localStorage
      
//       const response = await axios.post(
//         url,
//         { password: newPassword },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         setMessage("Password changed successfully.");
//       } else {
//         setMessage("Password reset failed. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error resetting password:", error);
//       setMessage(
//         error.response?.data?.message || "An error occurred. Please try again."
//       );
//     }
//   };

//   return (
//     <>
//       <div className="text-center mb-8">
//         <img
//           alt="Logo"
//           className="mx-auto"
//           height={50}
//           src="https://storage.googleapis.com/a1aa/image/4cL1wsTUIQblPRn3YdwcSyHulleeASktUgKv0TX4Ik5pNE9TA.jpg"
//           width={50}
//         />
//       </div>
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold mb-6">
//           Please choose a new password
//         </h2>
//         {message && <p className="mb-4 text-center text-red-600">{message}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-left mb-2" htmlFor="new-password">
//               New password
//             </label>
//             <div className="relative">
//               <input
//                 className="w-full text-zinc-100 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 id="new-password"
//                 placeholder="New password"
//                 type="password"
//                 value={newPassword}
//                 onChange={(e) => setNewPassword(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="mb-6">
//             <label className="block text-left mb-2" htmlFor="confirm-password">
//               Confirm new password
//             </label>
//             <input
//               className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               id="confirm-password"
//               placeholder="Confirm new password"
//               type="password"
//               value={confirmPassword}
//               onChange={(e) => setConfirmPassword(e.target.value)}
//             />
//           </div>
//           <button
//             className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//             type="submit"
//           >
//             Change Password
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }

// export default PasswordReset;


import { useState } from "react";
import axios from "axios";

function PasswordReset() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const url = "http://localhost:3000/passwordResetController"; // Update with the correct endpoint
      const token = localStorage.getItem("authToken"); // Ensure token is stored in localStorage
      
      if (!token) {
        setMessage("Authentication token is missing. Please log in again.");
        return;
      }

      const response = await axios.post(
        url,
        { password: newPassword }, // Payload to match backend expectations
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setMessage("Password changed successfully.");
      } else {
        setMessage(response.data.message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="text-center mb-8">
        <img
          alt="Logo"
          className="mx-auto"
          height={50}
          src="https://storage.googleapis.com/a1aa/image/4cL1wsTUIQblPRn3YdwcSyHulleeASktUgKv0TX4Ik5pNE9TA.jpg"
          width={50}
        />
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">
          Please choose a new password
        </h2>
        {message && <p className="mb-4 text-center text-red-600">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-left mb-2" htmlFor="new-password">
              New password
            </label>
            <div className="relative">
              <input
                className="w-full text-zinc-100 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                id="new-password"
                placeholder="New password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-left mb-2" htmlFor="confirm-password">
              Confirm new password
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="confirm-password"
              placeholder="Confirm new password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            type="submit"
          >
            Change Password
          </button>
        </form>
      </div>
    </>
  );
}

export default PasswordReset;
