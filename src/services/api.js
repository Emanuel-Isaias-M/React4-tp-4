import axios from "axios";

const API_URL = "https://rickandmortyapi.com/api/character/";

export const fetchCharacters = async (query = "") => {
  const url = query ? `${API_URL}?name=${encodeURIComponent(query)}` : API_URL;
  try {
    const { data } = await axios.get(url);
    return data.results; // array
  } catch (error) {
    // Propago para que Home.jsx maneje el toast
    throw error;
  }
};
