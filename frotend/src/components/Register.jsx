import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { registerUser } from "../redux/features/users/usersApi"; // Import API functions

const Register = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);
      alert("User registered successfully!");
      navigate("/");
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      alert("Google sign-in failed!");
      console.error(error);
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm bg-white shadow-md rounded px-8 pt-6 pb-8">
        <h2 className="text-xl font-semibold mb-4">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: "Email is required", pattern: /^\S+@\S+$/i })}
              type="email"
              placeholder="Email Address"
              className="border rounded w-full py-2 px-3 focus:outline-none"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
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
            Register
          </button>
        </form>

        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            Login
          </Link>
        </p>

        {/* Google Sign In */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            <FaGoogle className="mr-2" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">©2025 Book Store. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Register;
