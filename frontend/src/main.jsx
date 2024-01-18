import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import SkinCarePage from "./pages/SkinCarePage";
import UserPage from "./pages/UserPage";
import InstructionsPage from "./pages/InstructionsPage";
import NotFound from "./pages/NotFound";
import ChatBot from "./pages/ChatBot";

const apiUrl = import.meta.env.VITE_BACKEND_URL;
const weatherApi = import.meta.env.VITE_WEATHER;
const weatherKey = import.meta.env.VITE_WEATHER_KEY;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/:id",
        element: <SkinCarePage />,
        loader: async ({ params }) => {
          const weather = await axios
            .get(`${weatherApi}${weatherKey}&aqi=yes&q=Paris`)
            .then((res) => res.data);
          const user = await axios
            .get(`${apiUrl}/api/user/${params.id}`)
            .then((res) => res.data);
          const product = await axios
            .get(`${apiUrl}/api/product/`)
            .then((res) => res.data);
          return { product, user, weather };
        },
      },
      {
        path: "/user/:id",
        element: <UserPage />,
        loader: async ({ params }) => {
          const user = await axios.get(`${apiUrl}/api/user/${params.id}`);
          return user;
        },
      },
      {
        path: "/instructions",
        element: <InstructionsPage />,
      },
      {
        path: "/chatbot",
        element: <ChatBot />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
