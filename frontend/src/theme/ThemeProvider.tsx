import React from "react";
import {
  ThemeProvider as StyledThemeProvider,
  useTheme as useThemeStyled,
} from "styled-components";
import theme, { Theme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export function useTheme(): Theme {
  return useThemeStyled() as unknown as any;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
}
