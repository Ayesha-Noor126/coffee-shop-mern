import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setOrders(JSON.parse(localStorage.getItem("orders") || "[]"));
  }, []);

  if (orders.length === 0) return <div className="p-8"><h2 className="text-xl font-semibold">No orders yet.</h2></div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Orders</h1>
      {orders.map((order) => (
        <div key={order.id} className="border border-gray-200 rounded-lg p-4 mb-4">
          <p className="font-semibold">Order #{order.id}</p>
          <p className="text-sm text-gray-500">{order.status} — {order.date}</p>
          <p className="text-sm">{order.items.length} item(s)</p>
          <p className="font-bold">${order.total}</p>
        </div>
      ))}
    </div>
  );
}

export default Orders;