import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import coffeeData from "../data/coffee.json";

function EditCoffee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(null);

  useEffect(() => {
    // This mirrors a GET /coffees/:id call you'd make once there's a real API.
    const found = coffeeData.find((c) => c.id === Number(id));
    setForm(found || null);
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Replace with: await api.put(`/coffees/${id}`, form);
    console.log("Updated coffee (would PUT to backend):", form);
    navigate("/admin/manage-coffee");
  }

  if (!form) return <p style={{ padding: "2rem" }}>Coffee not found.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Edit Coffee</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" value={form.name} onChange={handleChange} style={styles.input} />
        <input name="price" type="number" step="0.01" value={form.price} onChange={handleChange} style={styles.input} />
        <select name="category" value={form.category} onChange={handleChange} style={styles.input}>
          <option>Hot</option><option>Cold</option><option>Desserts</option><option>Tea</option>
        </select>
        <textarea name="description" value={form.description} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.btn}>Update</button>
      </form>
    </div>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" },
  input: { padding: "0.6rem", border: "1px solid #ccc", borderRadius: "6px" },
  btn: { padding: "0.7rem", background: "#3b2417", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
};

export default EditCoffee;