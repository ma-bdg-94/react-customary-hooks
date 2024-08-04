import { renderHook, act } from "@testing-library/react";
import useMediaQuery from "./useMediaQuery";

describe("useMediaQuery", () => {
  beforeEach(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
      })),
    });
  });

  it("should return false initially when no match", () => {
    const { result } = renderHook(() => useMediaQuery("(min-width: 600px)"));
    expect(result.current).toBe(false);
  });

  it("should update when the media query matches", () => {
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();

    const matchMediaMock = jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: addEventListenerMock,
      removeEventListener: removeEventListenerMock,
    }));

    (window.matchMedia as jest.Mock) = matchMediaMock;

    const { result } = renderHook(() => useMediaQuery('(min-width: 600px)'));

    expect(result.current).toBe(false);

    const changeListener = addEventListenerMock.mock.calls[0][1];
    act(() => {
      changeListener({ matches: true });
    });

    expect(result.current).toBe(true);
  });

  it("should handle multiple media queries correctly", () => {
    const matchMediaMock = window.matchMedia as jest.Mock;

    matchMediaMock.mockImplementation((query) => ({
      matches: query === "(min-width: 600px)",
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));

    const { result, rerender } = renderHook(
      ({ query }) => useMediaQuery(query),
      {
        initialProps: { query: "(min-width: 600px)" },
      }
    );

    expect(result.current).toBe(true);

    rerender({ query: "(max-width: 600px)" });
    expect(result.current).toBe(false);
  });

  it("should cleanup event listeners on unmount", () => {
    const addEventListenerMock = jest.fn();
    const removeEventListenerMock = jest.fn();

    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: addEventListenerMock,
        removeEventListener: removeEventListenerMock,
      })),
    });

    const { unmount } = renderHook(() => useMediaQuery("(min-width: 600px)"));

    unmount();

    expect(removeEventListenerMock).toHaveBeenCalledWith(
      "change",
      expect.any(Function)
    );
  });
});
