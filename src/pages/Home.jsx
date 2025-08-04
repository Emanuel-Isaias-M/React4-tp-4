import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/api";
import CharacterCard from "../components/CharacterCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(""); // empieza vacío
  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );
  const [loading, setLoading] = useState(false);

  // 👉 Cargar todos al inicio
  useEffect(() => {
    const loadInitial = async () => {
      setLoading(true);
      try {
        const data = await fetchCharacters(""); // ✅ carga todo
        setCharacters(data);
      } catch {
        toast.error("No se pudieron cargar los personajes iniciales");
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  // 👉 Guardar favoritos en localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // 👉 Buscar con filtro y limitar a `count`
  const handleSearch = async (e) => {
    e.preventDefault();

    const n = Number(count);
    if (Number.isNaN(n) || n <= 0) {
      toast.error("Ingresá una cantidad válida (> 0)");
      return;
    }

    setLoading(true);
    try {
      const data = await fetchCharacters(query.trim());
      setCharacters(data.slice(0, n)); // ✅ limitar cantidad acá
      toast.success("Personajes cargados correctamente");
    } catch (error) {
      setCharacters([]);
      toast.error("No se encontraron personajes o falló la petición");
    } finally {
      setLoading(false);
    }
  };

  // 👉 Agregar o quitar de favoritos
  const toggleFavorite = (character) => {
    const exists = favorites.find((fav) => fav.id === character.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== character.id));
      toast.info("Favorito eliminado");
    } else {
      setFavorites([...favorites, character]);
      toast.success("Agregado a favoritos");
    }
  };

  // 👉 Chequear si es favorito
  const isFavorite = (character) =>
    favorites.some((fav) => fav.id === character.id);

  return (
    <div className="min-h-screen px-4 py-10 bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black mb-8 text-center drop-shadow-xl animate-pulse">
          Buscador de Personajes
        </h1>

        <form
          onSubmit={handleSearch}
          className="mb-10 flex flex-col gap-3 md:flex-row items-center justify-center"
        >
          <input
            type="text"
            placeholder="Buscar por nombre"
            className="rounded-xl px-4 py-2 w-full md:w-1/2 text-black"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <input
            type="number"
            min={1}
            className="rounded-xl px-4 py-2 w-24 text-black"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="Cantidad"
          />
          <button
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 px-6 py-2 rounded-xl text-white font-semibold shadow-md transition duration-300"
          >
            Buscar
          </button>
        </form>

        {loading && (
          <div className="flex justify-center items-center mb-6">
            <span className="size-6 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
            <span className="ml-3 text-lg">Cargando personajes...</span>
          </div>
        )}

        {!loading && characters.length === 0 && (
          <p className="text-center text-lg">No se encontraron personajes.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {characters.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onFavorite={toggleFavorite}
              isFavorite={isFavorite(character)}
            />
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={1500} />
    </div>
  );
};

export default Home;
