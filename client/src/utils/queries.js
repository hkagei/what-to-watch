import { gql } from "@apollo/client";

export const QUERY_ME = gql`
    me{
        _id
        username
        email
        savedMovies{
            movieId
            title
            description
            image
            releaseDate
            rating
        }
    }
`;
