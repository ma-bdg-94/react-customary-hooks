import { useEffect, useState } from 'react';

interface LocationPosition {
  latitude: number;
  longitude: number;
}

interface LocationError {
  code: number;
  message: string;
}

const useGeo = () => {
  const [position, setPosition] = useState<LocationPosition | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({ code: 0, message: "Geolocation is not supported by this browser." });
      setLoading(false);
      return;
    }

    const onSuccess = (position: GeolocationPosition) => {
      setPosition({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      setLoading(false);
    };

    const onError = (error: GeolocationPositionError) => {
      setError({ code: error.code, message: error.message });
      setLoading(false);
    };

    // Start watching the user's position
    const watchId = navigator.geolocation.watchPosition(onSuccess, onError);

    // Cleanup function to stop watching
    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return { position, error, loading };
};

export default useGeo;
