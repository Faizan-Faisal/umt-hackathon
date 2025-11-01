import { useState } from "react";
import { authService } from "../services/authService";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      await authService.requestPasswordReset(email);
      setSuccessMsg(
        "If this email exists, a reset link has been sent. Check your inbox."
      );
      setEmail("");
    } catch (error) {
      console.error(error);
      setErrorMsg("Failed to send reset link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl relative overflow-hidden"
      >
        {/* Subtle background shape */}
        <div className="absolute -top-16 -left-16 w-40 h-40 bg-indigo-200 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>
        <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-pink-200 rounded-full mix-blend-multiply opacity-30 animate-pulse"></div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Forgot Password
        </h2>
        <p className="text-gray-600 mb-6 text-center">
          Enter your registered email and we will send you a reset link.
        </p>

        {successMsg && (
          <div className="text-green-600 mb-4 text-center">{successMsg}</div>
        )}
        {errorMsg && (
          <div className="text-red-600 mb-4 text-center">{errorMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900"
              placeholder="you@example.com"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-all duration-300"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Remembered your password?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default ForgetPassword;
