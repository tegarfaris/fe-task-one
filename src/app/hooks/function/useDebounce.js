import { useState, useCallback, useRef } from "react";

// EXAMPLE USAGE

// const { debounceCallback, loading } = useDebounce(
//   (newValue: string) => {
//     // Your callback logic here
//     console.log(newValue);
//   },
//   300 // Debounce delay
// );

const useDebounce = ({ callback, delay }) => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef();

  return {
    debounce: useCallback(
      (...args) => {
        setLoading(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = window.setTimeout(() => {
          callback(...args);
          setLoading(false);
        }, delay);
      },
      [callback, delay]
    ),
    loading,
  };
};

export default useDebounce;
