import { gql } from "@apollo/client";

export const QUERY_ME = gql`
{    
    me{
        _id
        username
        email
        savedMovie{
            movieId
            title
            description
            image
            releaseDate
            rating
        }
    }
}
`;
