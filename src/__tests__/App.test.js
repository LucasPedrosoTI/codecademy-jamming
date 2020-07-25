import React from "react";
import sinon from "sinon";
import "@testing-library/jest-dom";

import App from "../containers/App/App";
import AlertTemplate from "react-alert-template-oldschool-dark";
import { renderHook } from "@testing-library/react-hooks";
import { useAlert } from "react-alert";
import { Provider as AlertProvider } from "react-alert";
import { render, fireEvent } from "@testing-library/react";

import mockSearchResults from "./searchResults.json";
import mockPlaylists from "./playlists.json";

const options = {
  position: "bottom center",
  timeout: 5000,
  offset: "30px",
  transition: "scale",
};

window.alert = jest.fn();

describe("App", () => {
  it("Should display the search results", async () => {
    sinon.stub(window.location, "assign");
    // jest.spyOn(window, "fetch").mockImplementation(() => {
    //   const searchResults = {
    //     json: Promise.resolve(mockSearchResults),
    //   };
    //   return Promise.resolve(searchResults);
    // });
    // jest.fn().mockResolvedValue(mockSearchResults);
    // .mockImplementation(() => {
    //   const playlists = {
    //     json: Promise.resolve(mockPlaylists),
    //   };
    //   return Promise.resolve(playlists);
    // });

    const { result } = renderHook(() => useAlert());

    const { container, findByTestId, findAllByTestId } = render(
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
      </AlertProvider>
    );

    // const searchInput = await findByTestId("search_input");
    // const searchForm = await findByTestId("search_form");

    // fireEvent.change(searchInput, { target: { value: "test" } });
    // fireEvent.submit(searchForm);

    console.log(container.innerHTML);
    // const tracks = await findAllByTestId("track");
    // expect(tracks.length).toBe(20);

    // window.fetch.mockRestore();
    window.alert.mockClear();
  });
});
