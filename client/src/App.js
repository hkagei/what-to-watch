import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';

import ApolloClient from 'apollo-boost';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem('id_token');

    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ' '
      }
    });
  },
  uri: 'graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={SearchMovies} />
            <Route exact path='/saved' component={SavedMovies} />
            <Route render={() => <h1 className='display-2'>Wrong page!</h1>} />
          </Switch>
        </>
      </Router>
    </ApolloProvider>
  );
}

export default App;
