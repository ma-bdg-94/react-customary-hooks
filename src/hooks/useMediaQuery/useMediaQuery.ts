import { useEffect, useState } from "react";

const useMediaQuery = (query: string): boolean => {
  const [queryMatches, setQueryMatches] = useState<boolean>(false);

  useEffect(() => {
    const updateMatch = (event: MediaQueryListEvent) => {
      setQueryMatches(event.matches);
    };

    // Create a MediaQueryList object
    const mediaQueryList = window.matchMedia(query);
    setQueryMatches(mediaQueryList.matches);
    
    // Add an event listener to handle changes in the media query state
    mediaQueryList.addEventListener("change", updateMatch);

    // Cleanup function to remove the event listener on unmount
    return () => {
      mediaQueryList.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return queryMatches;
};

export default useMediaQuery;
