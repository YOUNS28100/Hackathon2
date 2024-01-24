import React from "react";
import { Link } from "react-router-dom";
import errorImage from "../assets/pictures/errorImage.png";

function NotFound() {
  return (
    <div className="h-screen flex flex-col justify-center mt-10">
      <h1 className="text-5xl font-semibold text-gray-800 text-pretty mb-4">
        404
        <br />
        Page non trouvée
      </h1>
      <img
        src={errorImage}
        alt="Page Not Found"
        className=" mt-14 mx-auto rounded-3xl mb-8 opacity-75"
      />
      <p className="text-xl text-black mb-8">
        Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
      </p>
      <Link
        to="/"
        className="mx-28 py-3 bg-black text-white text-sm shadow text-center"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}

export default NotFound;
