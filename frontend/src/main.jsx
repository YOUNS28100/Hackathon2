import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import SkinCare from "./pages/SkinCarePage";
import UserPage from "./pages/UserPage";
import InstructionsPage from "./pages/InstructionsPage";
import ChatbotPage from "./pages/ChatbotPage";
import NotFound from "./pages/NotFound";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/:id",
        element: <SkinCare />,
        loader: async ({ params }) => {
          const user = await axios
            .get(`${apiUrl}/api/user/${params.id}`)
            .then((res) => res.data);
          const product = await axios
            .get(`${apiUrl}/api/product/`)
            .then((res) => res.data);
          return { product, user };
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
        element: <ChatbotPage />,
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
