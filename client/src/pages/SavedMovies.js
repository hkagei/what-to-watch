import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { REMOVE_MOVIE } from '../utils/mutations';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { QUERY_ME } from '../utils/queries';
import { deleteMovie } from '../utils/API';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

const SavedMovies = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const userData = data?.me || {};

  // const [removeMovie, { error }] = useMutation(REMOVE_MOVIE);

  // const userDataLength = Object.keys(userData).length;
  // useEffect(() => {
  //   const getUserData = async () => {
  //     try {
  //       const token = Auth.loggedIn() ? Auth.getToken() : null;

  //       if (!token) {
  //         console.log('no token')
  //         return false;
  //       }

  //       const response = await getMe(token);
  //       console.log(response)
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
      const { data } = await deleteMovie(movieId, token);
      removeMovieId(movieId);

      if (!data.ok) {
        throw new Error('something went wrong!');
      }

      // const updatedUser = await response.json();
      // setUserData(updatedUser);
      // // upon success, remove movie's id from localStorage
      // removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return 'Loading...';

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
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text>{movie.genre_ids}</Card.Text>
                  <Card.Text>{movie.description}</Card.Text>
                  <Card.Text>Release Date: {movie.releaseDate}</Card.Text>
                  <Card.Text>Rating: {movie.rating}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
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