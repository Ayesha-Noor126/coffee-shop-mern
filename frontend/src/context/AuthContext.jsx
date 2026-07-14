import { createContext, useState, useEffect } from "react"; // react build in create context 

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  // Placeholder logic — replace with a real API call once you have a backend.
  function login(email, password) {
    if (!email || !password) {
      return { success: false, message: "Email and password required." };
    }
    const fakeUser = { name: email.split("@")[0], email, role: email.includes("admin") ? "admin" : "customer" };
    setUser(fakeUser);
    return { success: true };
  }

  function register(name, email, password) {
    if (!name || !email || !password) {
      return { success: false, message: "All fields are required." };
    }
    const newUser = { name, email, role: "customer" };
    setUser(newUser);
    return { success: true };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}