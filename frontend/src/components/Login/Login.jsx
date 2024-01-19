/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";
import logo from "../../assets/logo-black.png";

export default function Login({ setIsLogged }) {
  const { auth, setAuth } = useOutletContext();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, data)
      .then((res) => setAuth(res.data))
      .catch((error) => {
        setErr(error.response.data.message);
      });
    navigate(`/${auth.id}`);
  };

  return (
    <div className="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-40">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-8" src={logo} alt="logo" />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
          Welcome Back
        </h3>

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
          Login or create account
        </p>

        <form
          className="flex justify-center items-center flex-col text-xl gap-3 bg-orange text-beige p-6 rounded-xl m-26 w-fit border-2 border-green"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
              placeholder="Email Address"
              {...register("email", { required: "E-mail is required" })}
            />
            {errors.mail && (
              <p role="alert" className="bg-gray-600 text-white text-sm p-0.5">
                {errors.mail?.message}
              </p>
            )}
          </div>

          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <p role="alert" className="bg-gray-600 text-white text-sm p-0.5">
                {errors.password?.message}
              </p>
            )}
            {err ? (
              <p
                role="alert"
                className="bg-gray-700 text-white text-md px-1 rounded-md"
              >
                {err}
              </p>
            ) : null}
          </div>

          <div className="flex items-center justify-between mt-4">
            <button
              type="submit"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-500 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">
          Don't have an account?{" "}
        </span>

        <button
          type="button"
          onClick={() => setIsLogged(false)}
          className="mx-2 text-sm font-bold text-gray-500 dark:text-blue-400 hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};
