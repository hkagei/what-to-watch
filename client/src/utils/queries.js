import { gql } from "@apollo/client";

<<<<<<< HEAD
export const QUERY_ME = gql`
{
me {
=======
export const QUERY_ME = gql` {
    me{
>>>>>>> feature/GraphQL
        _id
        username
        email
        savedMovie{
            movieId
            original_title
            overview
            poster_path
            release_date
            vote_average
        }
<<<<<<< HEAD
    }
=======
>>>>>>> feature/GraphQL
    }
}
`;
