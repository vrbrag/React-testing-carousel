import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";


it("renders without crashing", function () {
  render(<Carousel />)
});

it("matches snapshot", function () {
  const { asFragment } = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
});

it("works when you click on the right arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it("works when you click on the left arrow", function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />);
  const rightArrow = queryByTestId("right-arrow")
  const leftArrow = queryByTestId("left-arrow");
  //move forward
  fireEvent.click(rightArrow);
  //move backward
  fireEvent.click(leftArrow);

  //expect the first image to show
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument()
})

it("should have 'hidden' class when on either first or last image", function () {
  const { getByTestId } = render(<Carousel />);
  const leftArrow = getByTestId("left-arrow");
  const rightArrow = getByTestId("right-arrow");
  //expect on first image, left arrow is hidden
  expect(leftArrow).toHaveClass("hidden")
  expect(rightArrow).not.toHaveClass("hidden")

  // move forward, both arrow should show
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden")
  expect(rightArrow).not.toHaveClass("hidden")

  //move forward to last image, expect right arrow should be hidden
  fireEvent.click(rightArrow);
  expect(leftArrow).not.toHaveClass("hidden")
  expect(rightArrow).toHaveClass("hidden")
})