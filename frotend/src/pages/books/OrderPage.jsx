import React, { useEffect } from "react";
import { useGetOrderByEmailQuery } from "../../redux/features/orders/ordersApi";
import { useAuth } from "../../context/AuthContext";
import { getImgUrl } from "../../utils/getImgUrl";
import { useLocation } from "react-router-dom";

const OrderPage = () => {
  const { currentUser } = useAuth();
  const location = useLocation();
  
  const { data: orders = [], isLoading, isError, refetch } = useGetOrderByEmailQuery(currentUser?.email);

  // ✅ Auto-refresh orders when navigating to this page
  useEffect(() => {
    refetch();
  }, [location, refetch]);

  if (isLoading) return <div className="text-center text-lg font-semibold">Loading...</div>;
  if (isError) return <div className="text-center text-red-500">Error fetching orders</div>;

  console.log("Orders from API:", orders); // ✅ Debugging log

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-lg text-gray-600">No orders found!</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 shadow-lg rounded-lg">
            <thead className="bg-gray-800 text-white text-left">
              <tr>
                <th className="p-3 border">#</th>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Products</th>
                <th className="p-3 border">Total Price</th>
                <th className="p-3 border">Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id} className="border-b hover:bg-gray-100 transition">
                  <td className="p-4 border text-center font-semibold">{index + 1}</td>
                  <td className="p-4 border text-sm text-gray-700">{order._id}</td>
                  <td className="p-4 border">
                    {order.productIds.map((product) => (
                      <div key={product._id} className="flex items-center gap-4 py-2">
                        <img 
                          src={getImgUrl(product.coverImage) || "/default-image.jpg"} 
                          alt={product.title || "Product"} 
                          className="h-16 w-16 object-cover rounded border"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">{product.title || "Unknown Product"}</p>
                          <p className="text-sm text-gray-500"><strong>Category:</strong> {product.category || "N/A"}</p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 border font-semibold text-gray-900">₹{order.totalPrice}</td>
                  <td className="p-4 border text-sm text-gray-600">
                    {order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderPage;
