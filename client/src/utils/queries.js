import { gql } from "@apollo/client";

export const QUERY_ME = gql` {
    me{
        _id
        username
        email
        savedMovie{
            movieID
            original_title
            overview
            poster_path
            release_date
            vote_average
        }
    }
}
`;
