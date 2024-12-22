import { useState } from "react";
import axios from "axios";

function PasswordReset() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  const [password, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate token
    if (!token) {
      setMessage("Invalid or missing token. Please try resetting your password again.");
      return;
    }

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    // Validate password strength
    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    try {
      setLoading(true); // Show loading state

      // Send request to backend
      const response = await axios.post(
        ` http://localhost:3000/passwordResetController`,
        { password, confirmPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in the Authorization header
          },
        }
      );

      // Handle response
      if (response.data.status === 200) {
        setMessage("Password changed successfully! Redirecting to login...");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(response.data.message || "Password reset failed. Please try again.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response?.status === 401) {
        setMessage("Token expired or invalid. Please request a new password reset link.");
      } else {
        setMessage(error.response?.data?.message || "An error occurred. Please try again.");
      }
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6">Reset Your Password</h2>
        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("successfully") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left mb-2">
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="New Password"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-left mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Confirm Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Updating..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
