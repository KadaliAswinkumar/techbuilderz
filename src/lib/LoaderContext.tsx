
import { createContext, useContext, useState, ReactNode } from "react";

type LoaderState = {
  loaded: boolean;
  setLoaded: (v: boolean) => void;
};

const LoaderContext = createContext<LoaderState>({
  loaded: false,
  setLoaded: () => {},
});

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <LoaderContext.Provider value={{ loaded, setLoaded }}>
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
