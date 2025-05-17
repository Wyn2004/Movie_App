import { MovieCardSavedProps } from "@/components/MovieCardSaved";
import { Account, Client, Databases, ID, Query } from "react-native-appwrite";

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
const collectionIdSaved = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID_SAVED!;
const projectId = process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!;

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(projectId)
  .setPlatform("com.wyn.movieflix");

const database = new Databases(client);

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  try {
    const searchCount = await database.listDocuments(databaseId, collectionId, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (searchCount.documents.length > 0) {
      const existingSearch = searchCount.documents[0];
      await database.updateDocument(
        databaseId,
        collectionId,
        existingSearch.$id,
        {
          count: existingSearch.count + 1,
        }
      );
    } else {
      await database.createDocument(databaseId, collectionId, ID.unique(), {
        searchTerm,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        movie_id: movie.id,
        title: movie.title,
      });
    }
  } catch (error) {
    console.log("Error updating search count", error);
    throw error;
  }
};

export const fetchTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const trendingMovies = await database.listDocuments(
      databaseId,
      collectionId,
      [Query.orderDesc("count"), Query.orderDesc("$createdAt"), Query.limit(5)]
    );

    return trendingMovies.documents.map((doc) => ({
      searchTerm: doc.searchTerm,
      movie_id: doc.movie_id,
      title: doc.title,
      count: doc.count,
      poster_url: doc.poster_url,
    }));
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const isMovieExists = async (movieId: string): Promise<boolean> => {
  try {
    const savedMovies = await database.listDocuments(
      databaseId,
      collectionIdSaved,
      [Query.equal("movie_id", movieId)]
    );

    return savedMovies.documents.length > 0;
  } catch (error) {
    console.log("Error checking if movie is saved", error);
    return false;
  }
};

export const saveMovie = async (movie: Movie) => {
  try {
    console.log(movie.id);
    if (await isMovieExists(movie.id.toString())) {
      await unsaveMovie(movie.id.toString());
    } else {
      await database.createDocument(
        databaseId,
        collectionIdSaved,
        ID.unique(),
        {
          title: movie.title,
          year: movie.release_date,
          rating: movie.vote_average,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          movie_id: movie.id.toString(),
        }
      );
    }
  } catch (error) {
    console.log("Error saving movie", error);
    throw error;
  }
};

export const unsaveMovie = async (movie_id: string) => {
  try {
    const result = await database.listDocuments(databaseId, collectionIdSaved, [
      Query.equal("movie_id", movie_id),
    ]);
    if (result.documents.length > 0) {
      const documentId = result.documents[0].$id;
      await database.deleteDocument(databaseId, collectionIdSaved, documentId);
    } else {
      console.log("Movie not found in saved collection");
    }
  } catch (error) {
    console.log("Error unsaving movie", error);
    throw error;
  }
};

export const fetchSavedMovies = async (): Promise<MovieCardSavedProps[]> => {
  try {
    const savedMovies = await database.listDocuments(
      databaseId,
      collectionIdSaved
    );
    return savedMovies.documents.map((doc) => ({
      id: doc.movie_id,
      title: doc.title,
      year: doc.year,
      rating: doc.rating,
      poster_url: doc.poster_url,
    }));
  } catch (error) {
    console.log("Error getting saved movies", error);
    throw error;
  }
};
