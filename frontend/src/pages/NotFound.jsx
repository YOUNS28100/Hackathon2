import React from "react";
import { NavLink } from "react-router-dom";
import errorImage from "../assets/pictures/errorImage.png";

function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-5xl font-semibold text-gray-800 mb-4">
          404 - Page non trouvée
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Désolé, la page que vous cherchez n'existe pas ou a été déplacée.
        </p>
        <img
          src={errorImage}
          alt="Page Not Found"
          className="w-1/2 mx-auto mb-8 opacity-75"
        />
        <NavLink
          to="/"
          className="px-6 py-3 bg-black text-white text-sm font-bold uppercase rounded shadow hover:bg-gray-700 transition-colors"
        >
          Retour à l'accueil
        </NavLink>
      </div>
    </div>
  );
}

export default NotFound;
