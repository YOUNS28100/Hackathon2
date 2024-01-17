/* eslint-disable react/jsx-props-no-spreading */
import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import edit from "../../assets/iconEdit.png";
import cancel from "../../assets/cancel.png";

export default function UserInformation() {
  // const { auth } = useOutletContext();
  const { data } = useLoaderData();
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
    <div className="flex flex-col rounded-2xl m-4 p-4 w-fit">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        {visible.find((v) => v.id === 1 && v.visible) ? (
          <div className="firstname">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="text"
                name="firstname"
                required
                {...register("firstname", {
                  required: "Ce champs est obligatoire",
                  minLength: {
                    value: 2,
                    message:
                      "Votre prénom doit contenir au minimum 2 caractères",
                  },
                  pattern: {
                    value: /[A-Za-z]+$/,
                    message: "Votre prénom ne doit contenir que des lettres",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(2);
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
            <p className="text-2xl my-2">Prénom : {updatedData.firstname}</p>
            <button type="button" onClick={() => handleFormVisible(2)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 2 && v.visible) ? (
          <div className="">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="text"
                name="lastname"
                required
                {...register("lastname", {
                  required: "Ce champs est obligatoire",
                  minLength: {
                    value: 2,
                    message: "Votre nom doit contenir au minimum 2 caractères",
                  },
                  pattern: {
                    value: /[A-Za-z]+$/,
                    message: "Votre nom ne doit contenir que des lettres",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(3);
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
            <p className="text-2xl my-2">Nom : {updatedData.lastname}</p>
            <button type="button" onClick={() => handleFormVisible(3)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}
        {visible.find((v) => v.id === 3 && v.visible) ? (
          <div className="email">
            <div className="flex flex-row items-center gap-2 w-fit text-black">
              <input
                className="rounded-md pl-2"
                type="email"
                name="email"
                required
                {...register("mail", {
                  required: "Ce champs est obligatoire",
                  pattern: {
                    value: /\b[\w.-]+@[\w.-]+\.\w{2,4}\b/,
                    message:
                      "Votre email n'a pas la bonne syntaxe, ex: johndoe@doe.fr",
                  },
                })}
              />
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(4);
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
            <p className="text-2xl my-2">E-mail : {updatedData.mail}</p>
            <button type="button" onClick={() => handleFormVisible(4)}>
              <img src={edit} alt="crayon" className="w-6" />
            </button>
          </div>
        )}

        {visible.find((v) => v.id === 4 && v.visible) ? (
          <>
            <div className="flex flex-row gap-4 items-end mt-2 text-black">
              <div className="flex flex-col gap-2">
                <input
                  className="rounded-md pl-2"
                  type="password"
                  placeholder="Nouveau mot de passe:"
                  name="new-password"
                  required
                  {...register("newPassword", {
                    required: "Ce champs est obligatoire",
                    pattern: {
                      value:
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                      message:
                        "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un nombre et un caractère spécial",
                    },
                  })}
                />
                {errors.password && (
                  <p
                    role="alert"
                    className="bg-red-600 text-beige text-sm p-0.5"
                  >
                    {errors.password?.message}
                  </p>
                )}
                <input
                  className="rounded-md pl-2"
                  type="password"
                  placeholder="Confirmer mot de passe:"
                  name="confirm-password"
                  {...register("confirmPassword", {
                    required: "Vous devez confirmer votre mot de passe",
                    validate: (value) =>
                      value === watch("password") ||
                      "Mots de passe non identiques",
                  })}
                />
                {errors.confirmPassword && (
                  <p
                    role="alert"
                    className="bg-red-600 text-beige text-sm p-0.5"
                  >
                    {errors.confirmPassword?.message}
                  </p>
                )}
              </div>
              <button
                type="button"
                onClick={() => {
                  handleCancelForm(8);
                  resetField("newPassword");
                  resetField("confirmPassword");
                }}
              >
                <img src={cancel} alt="bouton annuler" className="w-6" />
              </button>
            </div>
            <p>
              Le mot de passe doit contenir au moins 8 caractères dont une
              majuscule, une minuscule, une chiffre et un caractère spécial
            </p>
          </>
        ) : (
          <div className="flex flex-row gap-2">
            <p className="text-2xl my-2">Modifier mot de passe</p>
            <button type="button" onClick={() => handleFormVisible(8)}>
              <img src={edit} alt="crayon" className="w-6" id="8" />
            </button>
          </div>
        )}

        <div className="flex flex-col items-center gap-2">
          {inputsValidated ? (
            <>
              <p>
                Entrer votre mot de passe actuel pour valider les changements
              </p>
              <input
                className="text-black"
                type="password"
                name="validate-password"
                {...register("password", {
                  required: "Ce champs est obligatoire",
                })}
              />
              <button
                type="submit"
                className="border-green border-2 rounded-md w-fit p-1"
              >
                Valider les changements
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setInputsValidated(true);
              }}
              className="border-green border-2 rounded-md w-fit p-1"
            >
              Valider la saisie
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
