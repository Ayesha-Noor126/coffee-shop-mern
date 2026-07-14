import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCoffee() {
  const [form, setForm] = useState({ name: "", image: "", price: "", category: "Hot", description: "" });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    // Replace with: await api.post("/coffees", form);
    console.log("New coffee (would POST to backend):", form);
    navigate("/admin/manage-coffee");
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Add Coffee</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} style={styles.input} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} style={styles.input} />
        <input name="price" type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange} style={styles.input} required />
        <select name="category" value={form.category} onChange={handleChange} style={styles.input}>
          <option>Hot</option><option>Cold</option><option>Desserts</option><option>Tea</option>
        </select>
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.btn}>Save</button>
      </form>
    </div>
  );
}

const styles = {
  form: { display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "400px" },
  input: { padding: "0.6rem", border: "1px solid #ccc", borderRadius: "6px" },
  btn: { padding: "0.7rem", background: "#3b2417", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer" },
};

export default AddCoffee;