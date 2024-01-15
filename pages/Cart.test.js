// Cart.test.js
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import renderer from "react-test-renderer";
import Cart from "./cart";
import "@testing-library/jest-dom";

it("renders correctly", () => {
  const tree = renderer.create(<Cart />).toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with a specific prop correctly", () => {
  const tree = renderer.create(<Cart someProp="value" />).toJSON();
  expect(tree).toMatchSnapshot();
});

jest.mock("../hooks/useCart", () => ({
  __esModule: true,
  default: () => ({
    cart: [
      {
        id: 1,
        title: "Product 1",
        brand: "Brand A",
        thumbnail: "image-url-1",
        quantity: 1,
        price: 10.0,
      },
    ],
    isLoading: false,
    isError: false,
    totalPrice: 20.0,
    removeFromCart: jest.fn(),
    increment: jest.fn(),
    decrement: jest.fn(),
    clearCart: jest.fn(),
  }),
}));

test("renders Cart component with mock cart data", () => {
  render(<Cart />);

  expect(screen.getByText("Shopping Cart")).toBeInTheDocument();
  expect(screen.getByText("Product 1")).toBeInTheDocument();
  expect(screen.getByText("Brand A")).toBeInTheDocument();
  expect(screen.getByText("Total Price: $ 20.00")).toBeInTheDocument();
});

test("handles decrement and increment button clicks", async () => {
  render(<Cart />);

  expect(screen.getByDisplayValue("1")).toBeInTheDocument();

  fireEvent.click(screen.getByText("-"));

  await waitFor(() => {
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });

  fireEvent.click(screen.getByText("+"));

  await waitFor(() => {
    expect(screen.getByDisplayValue("1")).toBeInTheDocument();
  });
});
