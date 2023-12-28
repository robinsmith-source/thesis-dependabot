"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type PortionSizeContext = {
  portionSize: number;
  setPortionSize: Dispatch<SetStateAction<number>>;
};
const PortionSizeContext = createContext<PortionSizeContext | null>(null);

export function PortionSizeProvider({ children }: { children: ReactNode }) {
  const [portionSize, setPortionSize] = useState<number>(1);
  return (
    <PortionSizeContext.Provider value={{ portionSize, setPortionSize }}>
      {children}
    </PortionSizeContext.Provider>
  );
}

export function usePortionSizeContext() {
  const context = useContext(PortionSizeContext);
  if (!context) {
    throw Error("usePortionSizeContext must be in PortionSizeProvider");
  }
  return context;
}
