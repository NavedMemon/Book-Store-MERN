import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/login";
import Register from "../components/register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:"/",
            element:<Home/>
        },
        {
            path:"/orders",
            element:<OrderPage/>
        },
        {
            path:"/about",
            element:<div>About</div>
        },
        {
          path:"/login",
          element:<Login/>
        },
        {
          path:"/register",
          element:<Register/>
        },
        {
          path:"/cart",
          element:<CartPage/>
        },
        {
          path:"/checkout",
          element:<PrivateRoute><CheckoutPage/></PrivateRoute>
        },
        {
          path:"/books/:id",
          element:<SingleBook/>
        }
      ]
    },
  ]);


  export default router;