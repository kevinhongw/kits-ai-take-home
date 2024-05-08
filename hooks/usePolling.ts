import { useEffect, useRef, useState } from 'react';

export const usePolling = <T>({
  pollFn,
  delay,
}: {
  pollFn: Function;
  delay: number;
}) => {
  const [data, setData] = useState<T | null>(null);
  const fetchDataIntervalId = useRef<
    ReturnType<typeof setInterval> | undefined
  >(undefined);

  // fetch on load
  useEffect(() => {
    const initialFetch = async () => {
      const response = await pollFn();

      setData(response);
    };

    initialFetch();
  }, []);

  // polling
  useEffect(() => {
    const execute = () => {
      if (fetchDataIntervalId.current) {
        clearInterval(fetchDataIntervalId.current);
        fetchDataIntervalId.current = undefined;
      }

      fetchDataIntervalId.current = setInterval(async () => {
        const response = await pollFn();

        setData(response);
      }, delay);
    };

    execute();

    // Clear the interval on unmount
    return () => clearInterval(fetchDataIntervalId.current);
  }, [pollFn, delay]);

  return data;
};
