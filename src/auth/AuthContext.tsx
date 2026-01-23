import { createContext, useContext, useState } from "react";

type User = {
  email: string;
  role: "admin" | "user";
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(sessionStorage.getItem("user") || "null")
  );

  const login = (email: string, password: string) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
    const adminPass = import.meta.env.VITE_ADMIN_PASSWORD;

    const userEmail = import.meta.env.VITE_USER_EMAIL;
    const userPass = import.meta.env.VITE_USER_PASSWORD;

    let loggedUser = null;

    if (email === adminEmail && password === adminPass) {
      loggedUser = { email, role: "admin" };
    }

    if (email === userEmail && password === userPass) {
      loggedUser = { email, role: "user" };
    }

    if (!loggedUser) throw new Error("Credenciales inválidas");

    sessionStorage.setItem("user", JSON.stringify(loggedUser));
    setUser(loggedUser);
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
