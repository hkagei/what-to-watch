import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    me{
        _id
        username
        email
        savedMovies{
            movieId
<<<<<<< HEAD
            authors
            image
            description
=======
>>>>>>> feature/mongo
            title
            description
            image
            releaseDate
            rating
        }

    }
`;
