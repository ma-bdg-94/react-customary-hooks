import { renderHook } from "@testing-library/react";
import useGeo from "./useGeo";

describe("useGeolocation", () => {
  let originalGeolocation: Geolocation;

  beforeAll(() => {
    originalGeolocation = navigator.geolocation;

    Object.defineProperty(global.navigator, "geolocation", {
      value: {
        watchPosition: jest.fn(),
        clearWatch: jest.fn(),
      },
      configurable: true,
    });
  });

  afterAll(() => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: originalGeolocation,
    });
  });

  it("should return position data when successful", () => {
    const watchPositionMock = (navigator.geolocation.watchPosition as jest.Mock);
    watchPositionMock.mockImplementation((successCallback) => {
      successCallback({
        coords: {
          latitude: 40.7128,
          longitude: -74.0060,
        },
      });
      return 1; 
    });

    const { result } = renderHook(() => useGeo());

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.position).toEqual({
      latitude: 40.7128,
      longitude: -74.0060,
    });
  });

  it("should return an error when geolocation fails", () => {
    const watchPositionMock = (navigator.geolocation.watchPosition as jest.Mock);
    watchPositionMock.mockImplementation((_, errorCallback) => {
      errorCallback({
        code: 1,
        message: "User denied Geolocation",
      });
      return 1; 
    });

    const { result } = renderHook(() => useGeo());

    expect(result.current.loading).toBe(false);
    expect(result.current.position).toBe(null);
    expect(result.current.error).toEqual({
      code: 1,
      message: "User denied Geolocation",
    });
  });

  it("should handle geolocation not supported", () => {
    Object.defineProperty(global.navigator, "geolocation", {
      value: undefined,
      configurable: true,
    });

    const { result } = renderHook(() => useGeo());

    expect(result.current.loading).toBe(false);
    expect(result.current.position).toBe(null);
    expect(result.current.error).toEqual({
      code: 0,
      message: "Geolocation is not supported by this browser.",
    });
  });
});
