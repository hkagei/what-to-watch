import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useQuery, useMutation } from '@apollo/client';
import {QUERY_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';
import {removeMovieId} from '../utils/localStorage';
import Auth from '../utils/auth'; 

const SavedMovies = () => {
  const { loading , data } = useQuery(QUERY_ME);
  //eslint-disable-next-line
  const [removeMovie, {error} ] = useMutation(REMOVE_MOVIE);
  const [userData] = data?.me || {};

  

  // create function that accepts the Movie's mongo _id value as param and deletes the Movie from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      //eslint-disable-next-line
      const { data } = await removeMovie({
       variables: {movieId}
      });
      removeMovieId(movieId) 

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
      <Jumbotron fluid className='text-light bg-dark'>
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
              <Card key={movie?.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.genre_ids}</Card.Text>
                  <Card.Text>{movie.description}</Card.Text>
                  <Card.Text>Release Date: {movie.releaseDate}</Card.Text>
                  <Card.Text>Rating: {movie.rating}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie?.movieId)}>
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
