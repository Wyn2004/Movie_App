import { Client, Databases, ID, Query } from "react-native-appwrite";

const databaseId = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
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
