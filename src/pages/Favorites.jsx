import CharacterCard from "../components/CharacterCard";

const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const removeFavorite = (character) => {
    const updated = favorites.filter((fav) => fav.id !== character.id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    window.location.reload(); // simple recarga para actualizar
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>
      {favorites.length === 0 ? (
        <p className="text-gray-500">No tenés personajes guardados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((character) => (
            <CharacterCard
              key={character.id}
              character={character}
              onFavorite={removeFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
