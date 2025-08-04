const CharacterCard = ({ character, onFavorite, isFavorite }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden hover:scale-105 hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col justify-between h-full">
      <img
        src={character.image}
        alt={character.name}
        className="w-full h-44 object-cover"
      />
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{character.name}</h2>
          <ul className="text-sm text-gray-700 space-y-1">
            <li><span className="font-semibold">Species:</span> {character.species}</li>
            <li><span className="font-semibold">Status:</span> {character.status}</li>
            <li><span className="font-semibold">Gender:</span> {character.gender}</li>
            <li><span className="font-semibold">Location:</span> {character.location?.name}</li>
            <li><span className="font-semibold">Origin:</span> {character.origin?.name}</li>
          </ul>
        </div>

        <button
          className={`mt-4 px-4 py-2 rounded-lg text-white w-full font-medium tracking-wide shadow-md transition-all duration-300 ease-in-out
            ${isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"}`}
          onClick={() => onFavorite(character)}
        >
          {isFavorite ? "Eliminar de favoritos" : "Agregar a favoritos"}
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;






