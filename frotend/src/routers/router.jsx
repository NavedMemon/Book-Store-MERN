import {createBrowserRouter,} from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/login";
import Register from "../components/register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";

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
            element:<div>Orders</div>
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
          element:<CheckoutPage/>
        },
        {
          path:"/books/:id",
          element:<SingleBook/>
        }
      ]
    },
  ]);


  export default router;