import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L5OymSJui7BirPsYNO3wvgoDm3GUsMuOHff5lqokvggap30S2XKH39RLZ9xvgdxMQ2mADsxhBbiRkLmNf0JQMBk00VOiI5q5l"
);

describe("CheckoutForm", () => {
  test("renders correctly", () => {
    const { getByText } = render(
      <Elements stripe={stripePromise}>
        <CheckoutForm totalPrice={10} formData={{}} />
      </Elements>
    );
    expect(getByText("Pay $10.00")).toBeInTheDocument();
  });
});
