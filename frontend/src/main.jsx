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
import ProductsPage from "./pages/ProductsPage";
import BasketPage from "./pages/BasketPage";

const apiUrl = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <SkinCare />,
        // a enlever
        loader: async () => {
          const product = await fetch(`${apiUrl}/api/product`).then((res) =>
            res.json()
          );
          return product;
        },
      },
      {
        path: "/user/:id",
        element: <UserPage />,
        loader: async ({ params }) => {
          const user = await axios
            .get(`${apiUrl}/api/user/${parseInt(params.id, 10)}`)
            .then((res) => res.data);
          return user;
        },
      },
      {
        path: "/product/:id",
        element: <ProductsPage />,
        loader: async ({ params }) => {
          const id = parseInt(params.id, 10);
          const product = await fetch(`${apiUrl}/api/product/${id}`);
          return product;
        },
      },
      {
        path: "/basket",
        element: <BasketPage />,
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
