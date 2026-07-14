import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import coffeeData from "../data/coffee.json";

function ManageCoffee() {
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    const deletedIds = JSON.parse(localStorage.getItem("deletedCoffeeIds") || "[]");
    setCoffees(coffeeData.filter((c) => !deletedIds.includes(c.id)));
  }, []);

  function handleDelete(id) {
    const deletedIds = JSON.parse(localStorage.getItem("deletedCoffeeIds") || "[]");
    localStorage.setItem("deletedCoffeeIds", JSON.stringify([...deletedIds, id]));
    setCoffees((prev) => prev.filter((c) => c.id !== id));
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Coffee</h1>
        <Link to="/admin/add-coffee" className="px-4 py-2 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition">
          + Add Coffee
        </Link>
      </div>

      <table className="w-full border-collapse mt-6">
        <thead>
          <tr className="text-left border-b border-gray-200">
            <th className="py-2">Name</th><th>Price</th><th>Category</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {coffees.map((c) => (
            <tr key={c.id} className="border-b border-gray-100">
              <td className="py-2">{c.name}</td>
              <td>${c.price.toFixed(2)}</td>
              <td>{c.category}</td>
              <td><Link to={`/admin/edit-coffee/${c.id}`} className="text-coffee-dark underline">Edit</Link></td>
              <td><button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800">Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ManageCoffee;