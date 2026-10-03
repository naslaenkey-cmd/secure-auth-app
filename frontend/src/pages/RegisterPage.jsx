 import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../contexts/AuthContext";
import {
  validateUsername,
  validateEmailMessage,
  validatePassword,
  validateFullName
} from "../utils/validation";
import Toast from "../components/Toast";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, checkUsername } = useAuth();

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });

    let error = "";

    if (name === "username") error = validateUsername(value);
    if (name === "fullName") error = validateFullName(value);
    if (name === "email") error = validateEmailMessage(value);
    if (name === "password") error = validatePassword(value);

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      username: validateUsername(form.username),
      fullName: validateFullName(form.fullName),
      email: validateEmailMessage(form.email),
      password: validatePassword(form.password)
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    setLoading(true);

    const usernameExists = await checkUsername(form.username);

    if (usernameExists) {
      setErrors({
        ...newErrors,
        username: "Username already exists"
      });

      setLoading(false);
      return;
    }

    const result = await register({
      ...form,
      avatar: "",
      createdAt: new Date().toISOString()
    });

    setLoading(false);

    if (!result.success) {
      setToast({
        message: result.message,
        type: "error"
      });

      return;
    }

    setToast({
      message: "Account created successfully!",
      type: "success"
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f7f4ff] flex items-center justify-center px-6 py-10">

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
            Create account
          </h1>

          <p className="text-gray-500 mt-1">
            Join us and create your personal space.
          </p>
        </div>

        <div className="bg-white border border-violet-100 rounded-3xl p-7 shadow-sm">

          <form onSubmit={handleSubmit} className="space-y-5">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Choose a username"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />

              {errors.username && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.username}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>

              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
              />

              {errors.fullName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.fullName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
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
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
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
              {loading ? "Creating account..." : "Create account"}
            </button>

          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-violet-500 font-medium hover:text-violet-700"
            >
              Sign in
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;