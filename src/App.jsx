import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import GeneratePage from "./pages/GeneratePage";

export default function App() {
  const [token, setToken] = useState(null);

  // Se carga correctamente incluso en GitHub Pages
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-gray-200">
        <Navbar />

        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/generate" 
              element={token ? <GeneratePage /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
