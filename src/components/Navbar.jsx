import { Link } from "react-router-dom";

export default function Navbar() {
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="sticky top-0 z-50 
      backdrop-blur-lg bg-white/5 
      border-b border-white/10
      shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link
          to="/"
          className="text-3xl font-extrabold 
            bg-gradient-to-r from-purple-300 to-pink-400 
            bg-clip-text text-transparent drop-shadow-lg"
        >
          IAwrite ✨
        </Link>

        {/* ENLACES */}
        <div className="flex items-center space-x-6">

          <Link
            to="/"
            className="text-gray-200 hover:text-purple-300 transition font-medium text-lg"
          >
            Inicio
          </Link>

          {token ? (
            <>
              <Link
                to="/generate"
                className="text-gray-200 hover:text-purple-300 transition font-medium text-lg"
              >
                Generar
              </Link>

              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-xl 
                  bg-gradient-to-r from-purple-500 to-pink-500 
                  text-white font-semibold shadow-lg 
                  hover:opacity-90 transition"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-xl 
                  bg-gradient-to-r from-purple-500 to-pink-500 
                  text-white font-semibold shadow-lg 
                  hover:opacity-90 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 rounded-xl 
                  border border-purple-400 
                  text-purple-300 font-medium 
                  hover:bg-white/10 transition"
              >
                Registro
              </Link>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}
