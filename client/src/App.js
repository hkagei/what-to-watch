import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import Navbar from './components/Navbar';

//Stripe imports
import{
  Elements,
  CardElement,
  useStripePromise,
  useElements,
} from "@stripe/react-stripe-js";
  import {retrieveStripe} from '@stripe/stripe-js';
  import "./App.css";
  

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

// Stripe functions

const App = () => {
  const stripePromise = retrieveStripe(
    "pk_test_51LXFykLV2oOJPgrv1Gzdsp4JUD7d54Q16U4Ba2whg8vIvBcC6apN8sQaU0udrKOi0ZGSXD4ybcaMzSFNbA82RXQA00BiUxeTev"
  );
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm/>
    </Elements>
  );
};
function CheckoutForm() {
  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const payMoney = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const clientSecret = getClientSecret();
    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: "",
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "successful") {
        alert("Your payment was successfully processed, thank you!");
      }
    }
  };

  return (
    <div
      style={{
        padding: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit = {payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "gold"
                  } 
                },
              }}
            />
            <button
              className="pay-button"
              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? "Loading..." : "Pay"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}







export default App;
