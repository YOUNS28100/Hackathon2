/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import PropTypes from "prop-types";

export default function Login() {
  const { auth, setAuth } = useOutletContext();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, data)
      .then((res) => setAuth(res.data))
      .catch((error) => {
        setErr(error.response.data.message);
      });
    if (auth.id) {
      navigate(`/${auth.id}`);
    }
  };

  return (
    <div className="w-full max-w-sm pt-28 bg-white">
      <div className="px-6 py-4">
        <h3 className="mt-3 text-xl font-medium text-center">Welcome Back</h3>

        <p className="text-center text-gray-500 mt-10">
          Login or create account
        </p>

        <form
          className="flex justify-center items-end flex-col text-xl gap-3 p-6 rounded-xl m-26 w-fit"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full mt-4">
            <input
              className="block w-full px-4 py-2 mt-2 border border-gray-800 rounded-md"
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
              className="block w-full px-4 py-2 mt-2 border border-gray-800  rounded-md"
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
              className="px-6 py-2 text-sm font-medium tracking-wide text-white  transition-colors duration-300 transform bg-black rounded-sm hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 mt-20 text-center bg-gray-50">
        <span className="text-sm text-gray-600">
          Don't have an account yet?{" "}
        </span>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mx-2 text-sm font-bold text-gray-500 hover:underline"
        >
          Register here
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};
