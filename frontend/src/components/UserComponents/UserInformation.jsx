/* eslint-disable react/jsx-props-no-spreading */
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import edit from "../../assets/iconEdit.png";
import cancel from "../../assets/cancel.png";

export default function UserInformation() {
  // const { auth } = useOutletContext();
  const data = useLoaderData();
  const [updatedData, setUpdatedData] = useState(data);
  const [isUpdated, setIsUpdated] = useState(false);
  const [inputsValidated, setInputsValidated] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    resetField,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstname: updatedData.firstname,
      lastname: updatedData.lastname,
      email: updatedData.email,
      password: "",
      confirmPassword: "",
    },
  });

  const visibleArray = [
    { id: 1, visible: false },
    { id: 2, visible: false },
    { id: 3, visible: false },
    { id: 4, visible: false },
    { id: 5, visible: false },
    { id: 6, visible: false },
  ];

  const [visible, setVisible] = useState(visibleArray);

  const handleFormVisible = (id) => {
    const arrayId = parseInt(id, 10);
    const index = arrayId - 1;
    setVisible(visible.toSpliced(index, 1, { id: arrayId, visible: true }));
  };

  const handleCancelForm = (id) => {
    const arrayId = parseInt(id, 10);
    const index = arrayId - 1;
    setVisible(visible.toSpliced(index, 1, { id: arrayId, visible: false }));
  };

  const onSubmit = async (newData) => {
    setVisible(visibleArray);
    try {
      await axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/api/user/`, newData)
        .then((res) => console.info(res.data))
        .then(setIsUpdated(true))
        .then(setInputsValidated(false));
    } catch (error) {
      console.error(error);
    }
    reset();
  };

  useEffect(
    (id) => {
      if (isUpdated) {
        try {
          axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/api/user/${id}`)
            .then((res) => {
              setUpdatedData(res.data);
              setIsUpdated(false);
            });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [isUpdated]
  );

  return (
    <div className="border-4 border-solid flex flex-col rounded-2xl m-4 p-4">
      <h1 className="font-CamptonBook text-3xl font-bold mb-6">
        Personal Informations
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {visible.find((v) => v.id === 1 && v.visible) ? (
          <div className="firstname">
            <div className="flex flex-row items-center gap-2 w-fit text-black ">
              <input
                className="rounded-md pl-2 border border-solid m-2"
                type="text"
                name="firstname"
                required
                {...register("firstname", {
                  required: "this field is required",
                  minLength: {
                    value: 2,
                    message: "Your name must contain at least 2 characters",
                  },
                  pattern: {
                    value: /[A-Za-z]+$/,
                    message: "Your name must only contain letters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(1);
                  resetField("firstname");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.e?.type && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.e.type?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-l my-2">Firstname : {updatedData.firstname}</p>
            <button type="button" onClick={() => handleFormVisible(1)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 2 && v.visible) ? (
          <div className="">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2 border border-solid m-2"
                type="text"
                name="lastname"
                required
                {...register("lastname", {
                  required: "This field is required",
                  minLength: {
                    value: 2,
                    message: "Your lastname must contain at least 2 characters",
                  },
                  pattern: {
                    value: /[A-Za-z]+$/,
                    message: "Your lastname must only contain letters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(2);
                  resetField("lastname");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.lastname && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.lastname?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-l my-2">Lastname : {updatedData.lastname}</p>
            <button type="button" onClick={() => handleFormVisible(2)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}

        {visible.find((v) => v.id === 3 && v.visible) ? (
          <div className="age">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2 border border-solid m-2"
                type="text"
                name="age"
                required
                {...register("age", {
                  required: "This field is required",
                  minLength: {
                    value: 1,
                  },
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid age with numbers only",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(3);
                  resetField("age");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.age && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.age?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-l my-2">Age : {updatedData.age}</p>
            <button type="button" onClick={() => handleFormVisible(3)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}

        {visible.find((v) => v.id === 4 && v.visible) ? (
          <div className="city">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2 border border-solid m-2"
                type="text"
                name="city"
                required
                {...register("city", {
                  required: "This field is required",
                  minLength: {
                    value: 2,
                    message: "Your city must contain at least 2 characters",
                  },
                  pattern: {
                    value: /[A-Za-z]+$/,
                    message: "Your city must only contain letters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(4);
                  resetField("city");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.city && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.city?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-l my-2">City : {updatedData.city}</p>
            <button type="button" onClick={() => handleFormVisible(4)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}

        {visible.find((v) => v.id === 5 && v.visible) ? (
          <div className="email">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2 border border-solid m-2"
                type="email"
                name="email"
                required
                {...register("mail", {
                  required: "This field is required",
                  pattern: {
                    value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
                    message:
                      "Your email does not have the correct syntax, ex: johndoe@doe.fr",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(5);
                  resetField("mail");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            {errors.email && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.email?.message}
              </p>
            )}
          </div>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-l my-2">E-mail : {updatedData.email}</p>
            <button type="button" onClick={() => handleFormVisible(5)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}

        {visible.find((v) => v.id === 6 && v.visible) ? (
          <>
            <div className="flex flex-row gap-4 items-end mt-2 text-black">
              <div className="flex flex-col gap-2">
                <input
                  className="rounded-md pl-2 border border-solid m-2"
                  type="password"
                  placeholder="New password:"
                  name="new-password"
                  required
                  {...register("newPassword", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Your password must contain at least 8 characters, an uppercase letter, a lowercase letter, a number and a special character",
                    },
                  })}
                />
                {errors.password && (
                  <p
                    role="alert"
                    className="bg-red-600 text-beige text-l p-0.5"
                  >
                    {errors.password?.message}
                  </p>
                )}
                <input
                  className="rounded-md pl-2 border border-solid m-2"
                  type="password"
                  placeholder="Confirm password:"
                  name="confirm-password"
                  {...register("confirmPassword", {
                    required: "You must confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Non-identical passwords",
                  })}
                />
                {errors.confirmPassword && (
                  <p
                    role="alert"
                    className="bg-red-600 text-beige text-l p-0.5"
                  >
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(6);
                  resetField("newPassword");
                  resetField("confirmPassword");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            <p>
              The password must contain at least 8 characters, one of which
              uppercase, lowercase, number and special character
            </p>
          </>
        ) : (
          <div className="flex flex-row gap-2 justify-center">
            <button
              type="button"
              className="px-6 py-2 text-sm font-medium tracking-wide text-white  transition-colors duration-300 transform bg-black hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50 mt-5"
              onClick={() => handleFormVisible(6)}
            >
              Change your password
            </button>
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          {inputsValidated ? (
            <>
              <p>Enter your current password to validate the changes</p>
              <input
                className="text-black border-4 border-solid m-2"
                type="password"
                name="validate-password"
                {...register("password", {
                  required: "this field is required",
                })}
              />
              <button
                type="submit"
                className="px-6 py-2 text-sm font-medium tracking-wide text-white  transition-colors duration-300 transform bg-black hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50 mt-5"
              >
                Validate the changes
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setInputsValidated(true);
              }}
              className="px-6 py-2 text-sm font-medium tracking-wide text-white  transition-colors duration-300 transform bg-black hover:bg-gray-300 focus:outline-none focus:ring focus:ring-opacity-50 mt-5"
            >
              VALIDATE
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
