import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
    }
  }
}
`;

export const SAVE_MOVIE = gql`
    mutation saveMovie($movieData: movieInput!) {
        saveMovie(movieData: $movieData) {
              user{
                savedMovie {
                  movieId
                  title
                  description
                  image
                  releaseDate
                  rating
              }
            }
           
        }
}

`;

export const REMOVE_MOVIE = gql`
mutation removeMovie($movieId: ID!) {
    removeMovie(movieId: $movieId) {
        user {         
        savedMovie {
          movieId
          title
          description
          image
          releaseDate
          rating
        }
      }
    }
}
`;


