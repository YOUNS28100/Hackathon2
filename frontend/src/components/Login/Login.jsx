/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState } from "react";

export default function Login() {
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
    <form
      className="flex flex-col items-center text-xl gap-3 bg-orange text-beige p-6 rounded-xl m-2 w-fit border-2 border-green"
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="mail">E-mail</label>
      <input
        className="text-black pl-2 w-64 rounded-md"
        type="email"
        name="mail"
        {...register("email", { required: "E-mail is required" })}
      />
      {errors.mail && (
        <p role="alert" className="bg-gray-600 text-white text-sm p-0.5">
          {errors.mail?.message}
        </p>
      )}
      <label htmlFor="password">Password</label>
      <input
        className="text-black pl-2 w-64 rounded-md"
        type="password"
        name="password"
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
      <button
        type="submit"
        className="bg-green text-beige text-2xl px-3 mt-5 rounded py-1 hover:text-3xl active:bg-beige active:text-green"
      >
        login
      </button>
    </form>
  );
}
