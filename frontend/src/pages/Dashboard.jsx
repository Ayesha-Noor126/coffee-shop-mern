import { useAuth } from "../hooks/useAuth";
import coffeeData from "../data/coffee.json";

function Dashboard() {
  const { user } = useAuth();
  const orders = JSON.parse(localStorage.getItem("orders") || "[]");
  const revenue = orders.reduce((sum, o) => sum + Number(o.total), 0);

  const stats = [
    { label: "Total Orders", value: orders.length },
    { label: "Revenue", value: `$${revenue.toFixed(2)}` },
    { label: "Customers", value: 1 },
    { label: "Products", value: coffeeData.length },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-4 mt-6">
        {stats.map((s) => (
          <div key={s.label} className="border border-gray-200 rounded-xl p-5 text-center shadow-sm">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-gray-500 text-sm">{s.label}</p>
          </div>
        ))}
      </div>

      {user.role === "admin" && (
        <a href="/admin/manage-coffee" className="mt-6 inline-block text-coffee-dark underline">
          Go to Manage Coffee →
        </a>
      )}
    </div>
  );
}

export default Dashboard;