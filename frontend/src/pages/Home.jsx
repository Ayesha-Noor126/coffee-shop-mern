import { Link } from "react-router-dom";
import coffeeData from "../data/coffee.json";

function Home() {
  const featured = coffeeData.slice(0, 3);

  return (
    <div>
      <section className="text-center py-16 px-8 bg-coffee-light">
        <h1 className="text-4xl font-bold text-coffee-dark">Bean & Brew</h1>
        <p className="mt-2 text-gray-700">Handcrafted coffee, made with love.</p>
        <Link
          to="/menu"
          className="inline-block mt-4 px-6 py-3 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition"
        >
          Browse Menu
        </Link>
      </section>

      <section className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Featured Coffees</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {featured.map((coffee) => (
            <div key={coffee.id} className="border border-gray-200 rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
              <img src={coffee.image} alt={coffee.name} className="w-full h-36 object-cover rounded-lg" />
              <h3 className="mt-2 font-medium">{coffee.name}</h3>
              <p className="text-gray-600">${coffee.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;