import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth(); // Get login function from context
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Track loading state
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Disable button while logging in
    setMessage(""); // Reset message

    try {
      const user = await login(data);

      // ✅ Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // ✅ Redirect based on role
      if (user?.email === "admin@gmail.com") {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {
      setMessage("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "Enter a valid email address",
                },
              })}
              type="email"
              placeholder="Email Address"
              className="border rounded w-full py-2 px-3 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              type="password"
              placeholder="Password"
              className="border rounded w-full py-2 px-3 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          {/* Error Message */}
          {message && <p className="text-red-500 text-xs mb-3">{message}</p>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className={`${
              loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-8 rounded w-full`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
