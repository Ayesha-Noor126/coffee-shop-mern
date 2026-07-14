import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) navigate("/dashboard");
    else setError(result.message);
  }

  return (
    <div className="flex justify-center py-12">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
        <h2 className="text-2xl font-bold">Login</h2>
        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-dark"
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-coffee-dark"
        />

        <button type="submit" className="py-2.5 bg-coffee-dark text-white rounded-lg hover:bg-[#2a1a10] transition">
          Login
        </button>
        <p className="text-sm">No account? <Link to="/register" className="text-coffee-dark underline">Register</Link></p>
        <p className="text-xs text-gray-400">Tip: use an email containing "admin" to test the admin dashboard.</p>
      </form>
    </div>
  );
}

export default Login;