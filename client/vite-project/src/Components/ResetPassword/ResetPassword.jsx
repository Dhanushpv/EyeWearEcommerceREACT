

import { useState } from "react";
import axios from "axios";
import LockResetIcon from "@mui/icons-material/LockReset";

function ResetPassword() {
  // State hooks for form fields and status messages
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Send email to the server to trigger the password reset
      const response = await axios.post("http://localhost:3000/forgot_password", { email });
      
      if (response.status === 200) {
        setSuccessMessage(response.data.message); // Assuming server sends a success message
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-zinc-200 w-full h-screen flex justify-center items-center">
        <div className="bg-gray-800 text-white rounded-lg p-8 md:p-16 shadow-lg w-full max-w-lg text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-700 p-3 rounded-full">
              <span className="w-64">
                <LockResetIcon />
              </span>
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold mb-4">Reset Password</h1>
          <p className="text-gray-400 mb-8">
            This content is password protected. To view it, please enter your email below.
          </p>
          
          {/* Success or Error Messages */}
          {successMessage && <div className="bg-green-500 text-white p-2 rounded mb-4">{successMessage}</div>}
          {errorMessage && <div className="bg-red-500 text-white p-2 rounded mb-4">{errorMessage}</div>}

          <form className="flex flex-col md:flex-row items-center justify-center" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full md:w-auto md:flex-1 p-3 rounded-l-lg md:rounded-l-lg md:rounded-r-none text-gray-100 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              type="submit"
              className="w-full md:w-auto md:mt-0 md:ml-2 bg-white text-gray-900 p-3 rounded-r-lg md:rounded-r-lg md:rounded-l-none font-semibold"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Now"}
            </button>
          </form>

          {/* Show Open Email Button if Reset is Successful */}
          {successMessage && (
            <div className="mt-6">
              <a
                href={`https://mailtrap.io/inboxes/3192705/messages`}
                className="w-full md:w-auto bg-blue-500 text-white p-3 rounded-md font-semibold"
              >
                Open Email App
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ResetPassword;
