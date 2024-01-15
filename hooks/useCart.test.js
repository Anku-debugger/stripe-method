// hooks/useCart.test.js

import { renderHook } from "@testing-library/react-hooks";
import { waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import useCart from "./useCart";

describe("useCart", () => {
  let queryClient;

  beforeEach(() => {
    queryClient = new QueryClient();
  });

  it("some functionality that uses localStorage", () => {
    localStorage.setItem("cart", "expectedValue");

    expect(localStorage.getItem("cart")).toBe("expectedValue");
  });

  it("adds an item to the cart", async () => {
    const result = renderHook(() => useCart(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });
  });

  it("fetches cart data initially", async () => {
    renderHook(() => useCart(), {
      wrapper: ({ children }) => (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      ),
    });
    await waitFor(() => !queryClient.isFetching);
  });
});
