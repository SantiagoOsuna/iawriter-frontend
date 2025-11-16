import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("https://iawriter-back.onrender.com/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      // Usuario creado correctamente
      if (res.ok) {
        alert("Usuario registrado correctamente. Ahora puedes iniciar sesión.");
        navigate("/login");
        return;
      }

      // Error conocido (correo existente u otro)
      const data = await res.json();
      alert(data.detail || "No se pudo completar el registro.");

    } catch (err) {
      alert("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-10">

        <h2 className="text-4xl font-extrabold text-center text-white drop-shadow mb-8">
          Crear cuenta en <span className="text-purple-300">IAwrite</span>
        </h2>

        <form onSubmit={handleRegister} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-purple-300 font-medium mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white rounded-xl 
              placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="usuario@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-purple-300 font-medium mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white rounded-xl 
              placeholder-gray-300 focus:ring-2 focus:ring-purple-400 outline-none"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 transition text-white rounded-xl font-semibold shadow-lg"
          >
            {loading ? "Registrando..." : "Crear cuenta"}
          </button>

          <p className="text-center text-gray-200 mt-4">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-purple-300 hover:text-purple-400 cursor-pointer font-semibold"
            >
              Inicia sesión
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
