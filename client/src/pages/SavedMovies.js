import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

//import { deleteMovie } from '../utils/API';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';

const SavedMovies = () => {
  //const [userData, setUserData] = useState({});
  const [removeMovie, {error}] = useMutation(REMOVE_MOVIE);
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         return false;
  //       }

  //       const response = await getMe(token);

  //       if (!response.ok) {
  //         throw new Error('something went wrong!');
  //       }

  //       const user = await response.json();
  //       setUserData(user);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   getUserData();
  // }, [userDataLength]);

  // create function that accepts the Movie's mongo _id value as param and deletes the Movie from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovie({
        variables: { movieId }
      });
      // const response = await deleteMovie(movieId, token);

      // if (!response.ok) {
      //   throw new Error('something went wrong!');
      // }

      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // upon success, remove movie's id from localStorage
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='gold'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.savedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} className="cardimg" alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title className="title">{movie.title}</Card.Title>                  
                  <Card.Text className="release">Release Date: {movie.releaseDate}</Card.Text>
                  <Card.Text className="rating">Rating: {movie.rating}</Card.Text>
                  <Card.Text>{movie.genre_ids}</Card.Text>
                  <Card.Text className="description">{movie.description}</Card.Text>

                  <Button className='btn-block button btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;