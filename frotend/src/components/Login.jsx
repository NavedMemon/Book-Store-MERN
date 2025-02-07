import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data);
      navigate("/"); // Redirect to home page after login
    } catch (error) {
      setMessage("Invalid email or password.");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
            <input
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              type="email"
              placeholder="Email Address"
              className="border rounded w-full py-2 px-3 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <input
              {...register("password", { required: "Password is required", minLength: 6 })}
              type="password"
              placeholder="Password"
              className="border rounded w-full py-2 px-3 focus:outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs">Password must be at least 6 characters</p>}
          </div>

          {message && <p className="text-red-500 text-xs mb-3">{message}</p>}

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded w-full">
            Login
          </button>
        </form>

        <p className="mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:text-blue-700">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
