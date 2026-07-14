const categories = ["All", "Hot", "Cold", "Desserts", "Tea"];

function CategoryFilter({ selected, onSelect }) {
  return (
    <div style={styles.wrap}>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelect(cat)}
          style={{
            ...styles.btn,
            background: selected === cat ? "#3b2417" : "#eee",
            color: selected === cat ? "#fff" : "#333",
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

const styles = {
  wrap: { display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap" },
  btn: { padding: "0.4rem 1rem", border: "none", borderRadius: "20px", cursor: "pointer" },
};

export default CategoryFilter;