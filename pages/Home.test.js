import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./index";

describe("Home Component", () => {
  it("renders slider with images", () => {
    const { queryAllByAltText } = render(<Home />);
    const images = queryAllByAltText("banner-img");
    expect(images.length).toBeGreaterThan(0);
  });
});
