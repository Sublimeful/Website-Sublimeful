import { useEffect, useState } from "react";

export default function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [state, setInternalState] = useState<T>(initialValue);

  const setState = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setInternalState(value);
  };

  // Set state to localStorage value
  useEffect(() => {
    const value = localStorage.getItem(key);
    if (value) {
      setInternalState(JSON.parse(value));
    }
  }, []);

  return [state, setState];
}
