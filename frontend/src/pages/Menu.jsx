import { useState, useMemo } from "react";
import coffeeData from "../data/coffee.json";
import CoffeeCard from "../components/CoffeeCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    return coffeeData.filter((coffee) => {
      const matchesSearch = coffee.name.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || coffee.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Our Menu</h1>
      <SearchBar value={search} onChange={setSearch} />
      <CategoryFilter selected={category} onSelect={setCategory} />

      {filtered.length === 0 ? (
        <p className="text-gray-500">No coffees match your search.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
          {filtered.map((coffee) => (
            <CoffeeCard key={coffee.id} coffee={coffee} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;