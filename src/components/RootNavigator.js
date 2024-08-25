import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Dashboard";
import FormComponent from "./FormComponent";
import FormConfigContextProvider from "../context/FormConfigContextProvider";

const RootNavigator = ({ children }) => {
  const appRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/form/:id",
      element: (
        <FormConfigContextProvider>
          <FormComponent />
        </FormConfigContextProvider>
      ),
    },
  ]);
  return <RouterProvider router={appRoutes}>{children}</RouterProvider>;
};
export default RootNavigator;
