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
        _id
        username
      }
    }
  }
`;

export const SAVE_MOVIE = gql`
<<<<<<< HEAD
    mutation saveMovie($movieData: MovieInput!) {
=======
    mutation saveMovie($movieData: movieInput!) {
>>>>>>> feature/mongo
        saveMovie(movieData: $movieData) {
            _id
            username
            email
            savedMovie {
<<<<<<< HEAD
                movieId
                authors
                image
                description
                title
                link
=======
              movieId
              title
              description
              image
              releaseDate
              rating
>>>>>>> feature/mongo
            }
        }
    }
`;

<<<<<<< HEAD
export const REMOVE_MOVIE = gql`
mutation removeMovie($movieId: ID!) {
    removeBook(movieId: $movieId) {
=======
export const REMOVE_Movie = gql`
mutation removeMovie($movieId: ID!) {
    removeMovie(movieId: $movieId) {
>>>>>>> feature/mongo
        _id
        username
        email
        savedMovie {
<<<<<<< HEAD
            movieId
            authors
            image
            description
            title
            link
=======
          movieId
          title
          description
          image
          releaseDate
          rating
>>>>>>> feature/mongo
        }
    }
}
`;
