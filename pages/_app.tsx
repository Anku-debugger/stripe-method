import React from "react";
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from './navbar';
import "../styles/globals.css";

const queryClient = new QueryClient();
const stripePromise = loadStripe("your_stripe_public_key");

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Elements stripe={stripePromise}>
        <Navbar/>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </Elements>
    </QueryClientProvider>
  );
}

export default MyApp;
