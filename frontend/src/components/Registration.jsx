/* eslint-disable react/jsx-props-no-spreading */
import { motion as m } from "framer-motion";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

import geol from "../assets/pointeur-de-localisation.png";

export default function Registration() {
  const stepsArray = [
    { id: 1, visible: false },
    { id: 2, visible: false },
    { id: 3, visible: false },
    { id: 4, visible: false },
    { id: 5, visible: false },
    { id: 6, visible: false },
    { id: 7, visible: false },
    { id: 8, visible: false },
  ];

  const [visible, setVisible] = useState(stepsArray);
  const [isStarted, setIsStarted] = useState(false);
  const [skinOption, setSkinOption] = useState(null);
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      latitude: null,
      longitude: null,
    },
  });

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/skin`)
      .then((res) => setSkinOption(res.data));
  });

  const startForm = (id) => {
    const arrayId = parseInt(id, 10);
    const index = arrayId - 1;
    setVisible(visible.toSpliced(index, 1, { id: arrayId, visible: true }));
    setIsStarted(true);
  };
  const handleFormVisible = (id) => {
    const arrayId = parseInt(id, 10);
    const stepPrec = arrayId - 1;
    const index = arrayId - 2;
    setVisible(
      visible.toSpliced(
        index,
        2,
        { id: stepPrec, visible: false },
        { id: arrayId, visible: true }
      )
    );
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition((position) => {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    } else {
      console.info("Geolocation is not supported by this browser.");
    }
  };

  const onSubmit = (data) => {
    if (lat && long) {
      const infos = {
        ...data,
        latitude: lat,
        longitude: long,
      };
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, infos)
        .then((res) => console.info(res.data));
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, data)
      .then((res) => console.info(res.data));
  };
  return (
    // ------------------------------------------------FORM START -------------------------------------------------
    <form onSubmit={handleSubmit(onSubmit)}>
      {!isStarted ? (
        <button
          className="text-2xl active:text-silverRust  bg-black text-white mx-28 py-2"
          type="button"
          onClick={() => startForm(1)}
        >
          Start Now
        </button>
      ) : null}
      {visible.find((v) => v.id === 1 && v.visible) ? (
        // -------------------------------------------FIRST/LAST NAME -------------------------------------------------
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col align-middle"
        >
          <div className="text-start text-3xl mr-1 mt-32 text-pretty">
            To create your unique
            <br /> profile
          </div>
          <div className="text-start text-pretty mt-32 mr-5 text-xl">
            Please enter your firstname and lastname
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            {" "}
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl"
              type="text"
              name="firstname"
              {...register("firstname", {
                required: "Ce champs est obligatoire",
                minLength: {
                  value: 2,
                  message: "Votre prénom doit contenir au minimum 2 caractères",
                },
                pattern: {
                  value: /[A-Za-z]+$/,
                  message: "Votre prénom doit contenir que des lettres",
                },
              })}
              placeholder="Firstname"
            />
            {errors.firstname && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.firstname?.message}
              </p>
            )}
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl "
              type="text"
              name="lastname"
              {...register("lastname", {
                minLength: {
                  value: 2,
                  message: "Votre nom doit contenir au minimum 2 caractères",
                },
                pattern: {
                  value: /[A-Za-z]+$/,
                  message: "Votre nom doit contenir que des lettres",
                },
              })}
              placeholder="Lastname (Optional)"
            />
            {errors.lastname && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.lastname?.message}
              </p>
            )}
            {/*     // -------------------------------------NEXT STEP ------------------------------------------------- */}
            <button
              className="text-2xl active:text-silverRust mt-5 bg-black text-white mx-28 py-2"
              type="button"
              onClick={() => handleFormVisible(2)}
            >
              NEXT
            </button>
          </div>
        </m.div>
      ) : null}
      {visible.find((v) => v.id === 2 && v.visible) ? (
        // ---------------------------------------------------MAIL ------------------------------------------------- */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col align-middle"
        >
          <div className="text-start text-3xl mr-1 mt-32 text-pretty">
            To connect and inform you
            <div className="text-start text-pretty mt-32 mr-5 text-xl">
              Please enter your email adress and confirm it
            </div>
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl"
              type="email"
              name="email"
              {...register("email", {
                required: "Ce champs est obligatoire",
                pattern: {
                  value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
                  message:
                    "Votre email n'a pas la bonne syntaxe, ex: johndoe@doe.fr",
                },
              })}
              placeholder="email"
            />
            {errors.email && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.email?.message}
              </p>
            )}
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl "
              type="email"
              name="confirmEmail"
              {...register("confirmemail", {
                required: "Vous devez confirmer votre email",
                validate: (value) =>
                  value === watch("email") || "Emails non identiques",
              })}
              placeholder="email confirmation"
            />
            {errors.confirmemail && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.confirmemail?.message}
              </p>
            )}
            {/* // --------------------------------------------------- NEXT STEP ------------------------------------------------- */}
            <button
              className="text-2xl active:text-silverRust mt-5 bg-black text-white mx-28 py-2"
              type="button"
              onClick={() => handleFormVisible(3)}
            >
              Next step
            </button>
          </div>
        </m.div>
      ) : null}
      {visible.find((v) => v.id === 3 && v.visible) ? (
        // ---------------------------------------------------PASSWORD------------------------------------------------- */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col align-middle"
        >
          <div className="text-start text-3xl mr-1 mt-32 text-pretty">
            Please enter your password
            <br />
            and confirm it
            <div className="text-start text-pretty mt-20 mr-5 text-xl">
              <i className="text-sm">
                Password must contain at least 8 characters, one uppercase, one
                lowercase, one number and one special character
              </i>
            </div>
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl"
              type="password"
              name="password"
              {...register("password", {
                required: "Ce champs est obligatoire",
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                  message:
                    "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial",
                },
              })}
              placeholder="Password"
            />
            {errors.password && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.password?.message}
              </p>
            )}
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl "
              type="password"
              name="confirmPassword"
              {...register("confirmPassword", {
                required: "Vous devez confirmer votre mot de passe",
                validate: (value) =>
                  value === watch("password") || "Mots de passe non identiques",
              })}
              placeholder="Password confirmation"
            />
            {errors.confirmpassword && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.confirmpassword?.message}
              </p>
            )}
            {/* // --------------------------------------------------- NEXT STEP ------------------------------------------------- */}
            <button
              className="text-2xl active:text-silverRust mt-5 bg-black text-white mx-28 py-2"
              type="button"
              onClick={() => handleFormVisible(4)}
            >
              Next step
            </button>
          </div>
        </m.div>
      ) : null}
      {visible.find((v) => v.id === 4 && v.visible) ? (
        // ---------------------------------------------------AGE ------------------------------------------------- */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col align-middle"
        >
          <div className="text-start pb-10 text-3xl mr-2 mt-32 text-pretty">
            Help us meet your needs for each step of your life
          </div>
          <div className="text-start text-pretty mt-40 mr-5 text-xl">
            Please enter your age
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl"
              type="text"
              name="age"
              {...register("age", {
                required: "Ce champs est obligatoire",
                valueAsNumber: "Un nombre est obligatoire",
                pattern: {
                  value: /\d+/,
                  message: "Seulement un nombre entier positif",
                },
              })}
              placeholder="Age"
            />
            {errors.age && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.age?.message}
              </p>
            )}
            {/* // --------------------------------------------------- NEXT STEP ------------------------------------------------- */}
            <button
              className="text-2xl active:text-silverRust mt-5 bg-black text-white mx-28 py-2"
              type="button"
              onClick={() => handleFormVisible(5)}
            >
              Next step
            </button>
          </div>
        </m.div>
      ) : null}

      {visible.find((v) => v.id === 5 && v.visible) ? (
        // ---------------------------------------------------CITY ------------------------------------------------- */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex ml-2 flex-col align-middle"
        >
          <div className="text-start text-3xl mr-1 mt-32 text-pretty">
            And now, fot the environment data affecting your skin
          </div>
          <div className="text-start text-pretty mt-14 mr-5 text-xl">
            Please enter your location
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl"
              type="text"
              name="city"
              {...register("city", {
                required: "Ce champs est obligatoire",
              })}
              placeholder="City"
            />
            {errors.city && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.city?.message}
              </p>
            )}
            <input
              className="border border-black h-10 rounded-lg p-2 px-3 text-xl "
              type="text"
              name="country"
              {...register("country", {
                required: "Ce champs est obligatoire",
                minLength: {
                  value: 3,
                  message: "Le pays doit contenir au minimum 4 caractères",
                },
              })}
              placeholder="Country"
            />
            {errors.country && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.country?.message}
              </p>
            )}
            <div className="flex flex-row justify-center gap-5">
              <img width={50} src={geol} alt="pointeur de localisation" />
              <p>
                {" "}
                Or just click
                <button
                  className="mx-2 underline-offset-1 underline"
                  type="button"
                  onClick={getLocation}
                >
                  <b>here</b>
                </button>
                for the most accurate geolocation{" "}
              </p>
            </div>
            {/* // --------------------------------------------------- NEXT STEP ------------------------------------------------- */}
            <button
              className="text-2xl active:text-silverRust  bg-black text-white mx-28 py-2"
              type="button"
              onClick={() => handleFormVisible(6)}
            >
              Next step
            </button>
          </div>
        </m.div>
      ) : null}
      {visible.find((v) => v.id === 6 && v.visible) ? (
        // ---------------------------------------------------SKIN TYPE 1 ------------------------------------------------- */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col align-middle mx-2"
        >
          <div className="text-start text-3xl mr-1 mt-32 text-pretty">
            Great! Now tell us more about your needs
            <div className="text-start text-pretty mt-32 mr-5 text-xl">
              How is your skin ?
            </div>
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            <select
              className="border border-black h-10 rounded-lg p-2 px-3 text-md"
              name="skinType1"
              {...register("skinType1", {
                required: "You must choose a skin type",
              })}
            >
              <option value="">--</option>
              {skinOption.map((skin) => (
                <option value={skin.id} key={skin.id}>
                  {skin.type}
                </option>
              ))}
            </select>
            {errors.skinType1 && (
              <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
                {errors.skinType1?.message}
              </p>
            )}
            {/* // --------------------------------------------------- NEXT STEP ------------------------------------------------- */}
            <button
              className="text-2xl active:text-silverRust mt-5 bg-black text-white mx-28 py-2"
              type="button"
              onClick={() => handleFormVisible(7)}
            >
              Next step
            </button>
          </div>
        </m.div>
      ) : null}
      {visible.find((v) => v.id === 7 && v.visible) ? (
        // ---------------------------------------------------SKIN TYPE 2 ------------------------------------------------- */}
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
          className="flex flex-col align-middle mx-2"
        >
          <div className="text-start text-3xl mr-1 mt-32 text-pretty">
            We'd like to learn more about it.
          </div>
          <div className="text-start text-pretty mt-32 mr-5 text-xl">
            {" "}
            This part is optional.
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            <select
              className="border border-black h-10 rounded-lg p-2 px-3 text-md"
              name="skinType2"
              {...register("skinType2")}
            >
              <option value="">--</option>
              {skinOption.map((skin) => (
                <option value={skin.id} key={skin.id}>
                  {skin.type}
                </option>
              ))}
            </select>
            <button
              className="text-2xl active:text-silverRust mt-5 bg-black text-white mx-28 py-2"
              type="button"
              onClick={() => handleFormVisible(8)}
            >
              Next step
            </button>
          </div>
        </m.div>
      ) : null}
      {visible.find((v) => v.id === 8 && v.visible) ? (
        // ---------------------------------------------------SKIN TYPE 3 ------------------------------------------------- */}
        <m.div>
          <div className="text-start text-3xl mr-1 mt-32 text-pretty">
            Anything else?
          </div>
          <div className="text-start text-pretty mt-32 mr-5 text-xl">
            {" "}
            This part is optional.
          </div>
          <div className="flex flex-col gap-9 mx-4 mt-3">
            <select
              className="border border-black h-10 rounded-lg p-2 px-3 text-md"
              name="skinType3"
              {...register("skinType3")}
            >
              <option value="">--</option>
              {skinOption.map((skin) => (
                <option value={skin.id} key={skin.id}>
                  {skin.type}
                </option>
              ))}
            </select>
            <button
              className="text-2xl active:text-silverRust mt-5 bg-black text-white mx-28 py-2"
              type="submit"
            >
              Done
            </button>
          </div>
        </m.div>
      ) : null}
    </form>
  );
}
