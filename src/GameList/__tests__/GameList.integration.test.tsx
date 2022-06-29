import "@testing-library/jest-native/extend-expect";
import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
  within,
} from "@testing-library/react-native";

import GameList from "..";
import mockGamesResponse from "./mockGamesResponse.json";
import mockGameDetailsResponse from "./mockGameDetailsResponse.json";

jest.useFakeTimers();

describe("GameList", () => {
  // Integration test for the GameList component
  // On production app, I would write a E2E test suite that produces screenshots
  // for visual regression testing on top of this test

  beforeEach(() => {
    // There are better way to mock this but this is the simplest
    global.fetch = jest.fn((url: string) =>
      Promise.resolve({
        json: () => {
          if (url.match(/api\/games\/\d+/))
            return Promise.resolve(mockGameDetailsResponse);

          return Promise.resolve(mockGamesResponse);
        },
      })
    ) as jest.Mock;
  });

  afterEach(() => {
    (global.fetch as jest.Mock).mockRestore();
  });

  it("renders a list of Game cards after loading finishes", async () => {
    render(<GameList />);

    await waitForElementToBeRemoved(() => screen.getByA11yHint("loading"));

    const cards = screen.queryAllByTestId(/GAME_CARD/);

    expect(cards).toHaveLength(2);
    expect(cards[0]).toHaveTextContent("Outriders Worldslayer");
    expect(cards[1]).toHaveTextContent("Sonic Origins");
  });

  it("should open GameDetails when tapping on a GAME_CARD", async () => {
    render(<GameList />);

    const cards = screen.queryAllByTestId(/GAME_CARD/);
    fireEvent.press(cards[0], {});

    expect(screen.getByTestId("GAME_DETAILS")).toBeTruthy();

    await waitForElementToBeRemoved(() => screen.getByA11yHint("loading"));

    const gameDetailsScreen = within(screen.getByTestId("GAME_DETAILS"));
    // It should render necessary game details
    expect(gameDetailsScreen.getByText(/Outriders Worldslayer/)).toBeTruthy();
    expect(gameDetailsScreen.getByText(/Take your existing/)).toBeTruthy();
    expect(gameDetailsScreen.getByText(/PlayStation 5, Xbox/)).toBeTruthy();
    expect(gameDetailsScreen.getByText(/Action, Shooter, RPG/)).toBeTruthy();
    expect(gameDetailsScreen.getByText(/Jun 28, 2022/)).toBeTruthy();
    expect(gameDetailsScreen.getByText(/People Can Fly/)).toBeTruthy();
    expect(gameDetailsScreen.getByText(/Square Enix/)).toBeTruthy();
  });
});
