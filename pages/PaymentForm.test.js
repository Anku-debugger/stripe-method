import React from "react";
import { render, screen, act } from "@testing-library/react";
import PaymentForm from "./PaymentForm";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

describe("PaymentForm", () => {
  test("renders the form", async () => {
    await act(async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <PaymentForm />
        </QueryClientProvider>
      );
    });

    expect(screen.getByText(/Edit Address/i)).toBeInTheDocument();
  });
});
