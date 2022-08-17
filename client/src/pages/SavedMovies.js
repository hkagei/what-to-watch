import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import { REMOVE_MOVIE } from '../utils/mutations';
import { removeMovieId } from '../utils/localStorage';
import Auth from '../utils/auth';

const SavedMovies = () => {

  const { loading, data } = useQuery(QUERY_ME);
  const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);
  const userData = data?.me || {};
  // const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again = gets replaced by mutations and queries


  // create function that accepts the movie's mongo _id value as param and deletes the movie from the database
  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = await removeMovie({
        variables: { movieId }
      });
      removeMovieId(movieId)


    } catch (err) {
      console.error(err);
    }
  };


  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing {userData?.username}'s saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.SavedMovies.length
            ? `Viewing ${userData.SavedMovies.length} saved ${userData.SavedMovies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.SavedMovies.map((movie) => {
            return (
              <Card key={movie.movieId} border='dark'>
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