import { useState } from "react";

export default function GeneratePage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token");

    try {
      const res = await fetch("https://iawriter-back.onrender.com/posts/generate-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ prompt }),
      });

      if (res.ok) {
        const data = await res.json();
        setArticle(data);
      } else {
        const data = await res.json();
        alert(data.detail || "Error al generar el artículo");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4 py-10 w-full min-h-screen">

      {/* FORM */}
      <form
        onSubmit={handleGenerate}
        className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 w-full max-w-3xl"
      >
        <h2 className="text-4xl font-bold mb-6 text-center text-white drop-shadow-lg">
          Generar Artículo con IA ✨
        </h2>

        <textarea
          required
          rows="5"
          placeholder="Escribe tu idea o prompt..."
          className="w-full px-5 py-4 text-gray-900 rounded-xl shadow-md bg-white/90 border border-gray-300 
                     focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all text-lg"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        {/* BOTÓN AJUSTADO A LA PALETA */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-4 mt-6 rounded-xl text-white font-semibold text-lg shadow-xl transition-all
            bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.03] hover:shadow-2xl`}
        >
          {loading ? "Generando..." : "Generar artículo"}
        </button>
      </form>

      {/* ARTÍCULO GENERADO */}
      {article && (
        <div className="mt-10 max-w-3xl w-full animate-fadeIn">
          <div className="bg-gradient-to-br from-[#1a1f35]/80 to-[#2a2347]/80
                          backdrop-blur-xl border border-white/10 shadow-2xl rounded-2xl p-10">

            {/* TÍTULO */}
            <h3 className="text-3xl font-extrabold text-white mb-4 text-center leading-tight">
              {article.title}
            </h3>

            <div className="w-full h-[1px] bg-white/20 my-6" />

            {/* TEXTO */}
            <div className="prose prose-invert prose-lg text-gray-200 leading-relaxed whitespace-pre-line">
              {article.body}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
