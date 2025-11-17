import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetch("https://iawriter-back.onrender.com/posts/")
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error cargando posts:", err));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e]">

      {/* HERO */}
      <section className="max-w-6xl mx-auto text-center py-20 px-6">
        <h2 className="text-5xl font-extrabold text-white drop-shadow-lg mb-4">
          Crea contenido con <span className="text-purple-300">Inteligencia Artificial</span>
        </h2>

        <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
          IAwrite genera artículos completos, optimizados y profesionales para tu blog.
          Solo ingresa un prompt y deja que la IA haga el resto.
        </p>

      <Link
        to="/generate"
        className="inline-block mt-8 px-8 py-3 text-lg bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg transition"
      >
        Crear artículo ahora
      </Link>
      </section>

      {/* FEED */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <h3 className="text-3xl font-bold text-purple-300 mb-8 border-l-4 border-purple-500 pl-4 drop-shadow-md">
          Artículos generados recientemente
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 hover:-translate-y-1 transition-transform"
              >
                <h2 className="text-xl font-bold text-white line-clamp-2 mb-3">
                  {post.title}
                </h2>

                <p className="text-gray-200 text-sm line-clamp-4">
                  {post.body}
                </p>

                <button
                  onClick={() => setSelectedPost(post)}
                  className="mt-4 text-purple-300 hover:text-purple-400 transition font-semibold"
                >
                  Leer más →
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-300">No hay artículos todavía.</p>
          )}
        </div>
      </div>

      {/* MODAL */}
{selectedPost && (
  <div
    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 z-50 animate-fadeIn"
    onClick={() => setSelectedPost(null)} // 👉 Cerrar al hacer click afuera
  >
    {/* MODAL BOX */}
    <div
      className="
        bg-white/10 
        border border-white/20 
        shadow-2xl 
        rounded-2xl 
        backdrop-blur-xl 
        p-6 
        w-full 
        max-w-xl
        max-h-[75vh]
        overflow-hidden
        text-white 
        relative 
        animate-scaleIn
      "
      onClick={(e) => e.stopPropagation()} // 👉 Evita cerrar cuando haces click dentro
    >
      {/* BOTÓN CERRAR */}
      <button
        onClick={() => setSelectedPost(null)}
        className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
      >
        ✕
      </button>

      <h2 className="text-3xl font-bold text-purple-300 mb-4 drop-shadow">
        {selectedPost.title}
      </h2>

      {/* SCROLL AREA CON FADE-EFFECT */}
      <div className="relative max-h-[60vh] overflow-y-auto pr-2">

        {/* FADE TOP */}
        <div className="pointer-events-none absolute top-0 left-0 w-full h-6 bg-gradient-to-b from-[#24243e] to-transparent"></div>

        {/* FADE BOTTOM */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-6 bg-gradient-to-t from-[#24243e] to-transparent"></div>

        <p className="text-gray-200 leading-relaxed whitespace-pre-line text-justify">
          {selectedPost.body}
        </p>
      </div>

    </div>
  </div>
)}

      {/* ANIMACIONES */}
      <style>
        {`
          .animate-fadeIn {
            animation: fadeIn 0.25s ease-out;
          }

          .animate-scaleIn {
            animation: scaleIn 0.25s ease-out;
          }

          @keyframes fadeIn {
            from { opacity: 0 }
            to   { opacity: 1 }
          }

          @keyframes scaleIn {
            from { transform: scale(0.92); opacity: 0 }
            to   { transform: scale(1); opacity: 1 }
          }
        `}
      </style>

    </div>
  );
}
