import { createBrowserRouter, Redirect, useRoutes } from "react-router-dom";
import React from "react";
import Home from "./views/Home";
import Search from "./views/Search";
import Layout from "./components/layouts/Layout";
import RecommendAllList from "./views/RecommendAllList";
import PlayListDetails from "./views/PlayListDeatils";
import App from "./App";

const routes = [
  {
    path: "/",
    element: <Layout />,

    children: [
      { index: true, element: <Home /> },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "recommendAllList",
        element: <RecommendAllList />,
      },
      {
        path: "playListDetails/:id",
        element: <PlayListDetails />,
      },
    ],
  },
];

export default routes;
