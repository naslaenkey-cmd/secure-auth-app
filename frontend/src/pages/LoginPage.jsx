 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import {
  validateEmailMessage,
  validatePassword
} from "../utils/validation";
import Toast from "../components/Toast";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmailMessage(email);
    const passwordError = validatePassword(password);

    setErrors({
      email: emailError,
      password: passwordError
    });

    if (emailError || passwordError) return;

    setLoading(true);

    const result = await login(email, password);

    setLoading(false);

    if (!result.success) {
      setToast({
        message: result.message,
        type: "error"
      });
      return;
    }

    setToast({
      message: "Login successful!",
      type: "success"
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ff] flex items-center justify-center px-6">

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
        />
      )}

      <div className="w-full max-w-md">

        <div className="mb-6">
          <span className="text-sm font-medium text-violet-500">
            Secure Space
          </span>

          <h1 className="text-3xl font-semibold text-gray-800 mt-2">
            Welcome back
          </h1>

          <p className="text-gray-500 mt-1">
            Sign in to continue to your account.
          </p>
        </div>

        <div className="bg-white border border-violet-100 rounded-3xl p-7 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({
                    ...errors,
                    email: validateEmailMessage(e.target.value)
                  });
                }}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />

              {errors.email && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm text-violet-500 hover:text-violet-700"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({
                    ...errors,
                    password: validatePassword(e.target.value)
                  });
                }}
                placeholder="Enter your password"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />

              {errors.password && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-violet-500 text-white py-3 rounded-xl hover:bg-violet-600 transition"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-violet-500 font-medium hover:text-violet-700"
            >
              Create one
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;