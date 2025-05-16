export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  BASE_URL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  try {
    const enpoint = query
      ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(
          query
        )}`
      : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

    const response = await fetch(enpoint, {
      method: "GET",
      headers: TMDB_CONFIG.headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch movies!!!");
    }

    const data = await response.json();

    return data.results;
  } catch (error) {
    throw new Error("Failed to fetch movies: " + error);
  }
};
