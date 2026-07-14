import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) return setError("Passwords do not match.");
    if (form.password.length < 6) return setError("Password must be at least 6 characters.");

    const result = register(form.name, form.email, form.password);
    if (result.success) navigate("/dashboard");
    else setError(result.message);
  }

  const inputClass = "px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-dark";

  return (
    <div className="flex justify-center py-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold">Register</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className={inputClass} />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className={inputClass} />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className={inputClass} />
        <input name="confirmPassword" type="password" placeholder="Confirm Password" value={form.confirmPassword} onChange={handleChange} className={inputClass} />

        <button type="submit" className="py-2.5 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition">
          Register
        </button>
        <p className="text-sm">Already have an account? <Link to="/login" className="text-coffee-dark underline">Login</Link></p>
      </form>
    </div>
  );
}

export default Register;