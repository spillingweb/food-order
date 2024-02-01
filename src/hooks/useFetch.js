import { useState, useEffect } from "react";

export function useFetch(fetchFn, initialvalue) {
  const [fetchedData, setFetchedData] = useState(initialvalue);
  const [error, setError] = useState();
  const [isFetching, setIsFetching] = useState();

  useEffect(() => {
    async function fetchData() {
      setIsFetching(true);

      try {
        const data = await fetchFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch data" });
      }

      setIsFetching(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    isFetching,
    error,
    fetchedData,
    setFetchedData
  };
}
