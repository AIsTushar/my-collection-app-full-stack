import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import About from "./pages/About";
import ProfilePage from "./pages/ProfilePage";
import MyProfile from "./components/Profile/MyProfile";
import MyCollections from "./components/Profile/MyCollections";
import Items from "./components/Profile/Items";
import CollectionPage from "./pages/CollectionPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import Error from "./components/Error";
import {
  homePageloader,
  collectionPageloader,
  itemPageloader,
  categoryLoader,
} from "./utils/loader";
import CreateItem from "./pages/CreateItem";
import CreateCollection from "./pages/CreateCollection";
import EditItem from "./pages/EditItem";

function Routes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <Error />,
      children: [
        {
          path: "/",
          element: <Home />,
          loader: homePageloader,
        },
        {
          path: "about",
          element: <About />,
        },

        {
          path: "profile",
          element: <ProfilePage />,
          children: [
            {
              index: true,
              element: <MyProfile />,
            },
            {
              path: "collections",
              element: <MyCollections />,
            },
            {
              path: "createCollection",
              element: <CreateCollection />,
              loader: categoryLoader,
            },
            {
              path: "items",
              element: <Items />,
            },
            {
              path: "createItem",
              element: <CreateItem />,
            },
          ],
        },
        {
          path: "collections/:collectionId",
          element: <CollectionPage />,
          loader: ({ params }) => collectionPageloader(params.collectionId),
        },
        {
          path: "Items/:itemId",
          element: <ItemDetailsPage />,
          loader: ({ params }) => itemPageloader(params.itemId),
        },
        {
          path: "Items/:itemId/edit",
          element: <EditItem />,
          loader: ({ params }) => itemPageloader(params.itemId),
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default Routes;
