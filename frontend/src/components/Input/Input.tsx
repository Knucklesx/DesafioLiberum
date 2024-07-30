import { BaseComponent } from "@src/theme/BaseComponent";
import { StyleSheet } from "@src/theme/StyleSheet";
import { ThemeTypographVariant } from "@src/theme/theme";
import { useTheme } from "@src/theme/ThemeProvider";
import React from "react";

interface TextProps {
  variant?: ThemeTypographVariant;
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  [key: string]: any;
}
const Input = ({ styleSheet, variant = "body2", ...props }: TextProps) => {
  const theme = useTheme();
  const textVariant = theme.typography.variants[variant];

  return (
    <BaseComponent
      styleSheet={{
        fontFamily: theme.typography.fontFamily,
        ...textVariant,
        ...styleSheet,
      }}
      {...props}
    >
      <input
        {...props}
        style={{ padding: "0 0 0 10px", borderRadius: "5px" }}
      />
    </BaseComponent>
  );
};

export default Input;
