import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../components/login";
import Register from "../components/register";
import CartPage from "../pages/books/CartPage";
import CheckoutPage from "../pages/books/CheckoutPage";
import SingleBook from "../pages/books/SingleBook";
import PrivateRoute from "./PrivateRoute";
import OrderPage from "../pages/books/OrderPage";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import AddBook from "../pages/dashboard/addBook/AddBook";
import UpdateBook from "../pages/dashboard/EditBook/UpdateBook";
import ManageBooks from "../pages/dashboard/manageBooks/manageBooks";
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/dashboard/manageUsers/manageUsers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/orders", element: <PrivateRoute><OrderPage /></PrivateRoute> },
      { path: "/about", element: <div>About</div> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/checkout", element: <PrivateRoute><CheckoutPage /></PrivateRoute> },
      { path: "/books/:id", element: <SingleBook /> },
      { path: "/feedback", element: <div>Feedback</div> }
    ]
  },
  {
    path: "/dashboard",
    element: <AdminRoute><DashboardLayout /></AdminRoute>, // ✅ Protects all dashboard routes
    children: [
      { path: "", element: <Dashboard /> },
      { path: "add-new-book", element: <AddBook /> },
      { path: "edit-book/:id", element: <UpdateBook /> },
      { path: "manage-books", element: <ManageBooks /> },
      
      { path: "manage-users", element: <ManageUsers /> }
    ]
  }
]);

export default router;
