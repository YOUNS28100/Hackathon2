/* eslint-disable react/jsx-props-no-spreading */
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import geol from "../assets/pointeur-de-localisation.png";

export default function Registration({ setIsLogged }) {
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
      setIsLogged(true);
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/user`, data)
      .then((res) => console.info(res.data));
    setIsLogged(true);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Welcome, please register to use this application</h1>
      {!isStarted ? (
        <button type="button" onClick={() => startForm(1)}>
          Start
        </button>
      ) : null}
      {visible.find((v) => v.id === 1 && v.visible) ? (
        <div>
          <label htmlFor="firstname">
            Please enter your firstname and lastname (optional)
            <br />
            To create an unique and custom profil
          </label>
          <input
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
          />
          {errors.firstname && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.firstname?.message}
            </p>
          )}
          <input
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
          />
          {errors.lastname && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.lastname?.message}
            </p>
          )}
          <button type="button" onClick={() => handleFormVisible(2)}>
            Next step
          </button>
        </div>
      ) : null}
      {visible.find((v) => v.id === 2 && v.visible) ? (
        <div>
          <label htmlFor="email">
            Please enter your email adress and confirm it
            <br />
            to connect and inform you
          </label>
          <input
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
          />
          {errors.email && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.email?.message}
            </p>
          )}
          <input
            type="email"
            name="confirmEmail"
            {...register("confirmemail", {
              required: "Vous devez confirmer votre email",
              validate: (value) =>
                value === watch("email") || "Emails non identiques",
            })}
          />
          {errors.confirmemail && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.confirmemail?.message}
            </p>
          )}
          <button type="button" onClick={() => handleFormVisible(3)}>
            Next step
          </button>
        </div>
      ) : null}
      {visible.find((v) => v.id === 3 && v.visible) ? (
        <div>
          <label htmlFor="password">
            Please enter a password
            <br />
            <i className="text-sm">
              (Password must contain at least 8 characters, one uppercase, one
              lowercase, one number and one special character)
            </i>
            <br />
            and confirm it
          </label>
          <input
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
          />
          {errors.password && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.password?.message}
            </p>
          )}
          <input
            type="password"
            name="confirmPassword"
            {...register("confirmPassword", {
              required: "Vous devez confirmer votre mot de passe",
              validate: (value) =>
                value === watch("password") || "Mots de passe non identiques",
            })}
          />
          {errors.confirmpassword && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.confirmpassword?.message}
            </p>
          )}
          <button type="button" onClick={() => handleFormVisible(4)}>
            Next step
          </button>
        </div>
      ) : null}
      {visible.find((v) => v.id === 4 && v.visible) ? (
        <div>
          <label htmlFor="age">
            Please enter your age
            <br />
            Essential to understand specifics needs for your skin for each steps
            of your life
          </label>
          <input
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
          />
          {errors.age && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.age?.message}
            </p>
          )}
          <button type="button" onClick={() => handleFormVisible(5)}>
            Next step
          </button>
        </div>
      ) : null}

      {visible.find((v) => v.id === 5 && v.visible) ? (
        <div>
          <label htmlFor="city">
            Please enter your location (city and country)
            <br />
            to account for the environment affecting your skin
          </label>
          <input
            type="text"
            name="city"
            {...register("city", {
              required: "Ce champs est obligatoire",
            })}
          />
          {errors.city && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.city?.message}
            </p>
          )}
          <input
            type="text"
            name="country"
            {...register("country", {
              required: "Ce champs est obligatoire",
              minLength: {
                value: 3,
                message: "Le pays doit contenir au minimum 4 caractères",
              },
            })}
          />
          {errors.country && (
            <p role="alert" className="bg-red-600 text-beige text-sm p-0.5">
              {errors.country?.message}
            </p>
          )}
          <p> or geolocate yourself</p>
          <button type="button" onClick={getLocation}>
            <img src={geol} alt="pointeur de localisation" />
          </button>
          <button type="button" onClick={() => handleFormVisible(6)}>
            Next step
          </button>
        </div>
      ) : null}
      {visible.find((v) => v.id === 6 && v.visible) ? (
        <div>
          <label htmlFor="skinType1">
            Please select your principal skin type
          </label>
          <select
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
          <button type="button" onClick={() => handleFormVisible(7)}>
            Next step
          </button>
        </div>
      ) : null}
      {visible.find((v) => v.id === 7 && v.visible) ? (
        <div>
          <label htmlFor="skinType2">
            Please select your secondary skin type (optional)
          </label>
          <select name="skinType2" {...register("skinType2")}>
            <option value="">--</option>
            {skinOption.map((skin) => (
              <option value={skin.id} key={skin.id}>
                {skin.type}
              </option>
            ))}
          </select>
          <button type="button" onClick={() => handleFormVisible(8)}>
            Next step
          </button>
        </div>
      ) : null}
      {visible.find((v) => v.id === 8 && v.visible) ? (
        <div>
          <label htmlFor="skinType3">
            Please select your tertiary skin type (optional)
          </label>
          <select name="skinType3" {...register("skinType3")}>
            <option value="">--</option>
            {skinOption.map((skin) => (
              <option value={skin.id} key={skin.id}>
                {skin.type}
              </option>
            ))}
          </select>
          <button type="submit">Validate to finish your registration</button>
        </div>
      ) : null}
    </form>
  );
}

Registration.propTypes = {
  setIsLogged: PropTypes.func.isRequired,
};
