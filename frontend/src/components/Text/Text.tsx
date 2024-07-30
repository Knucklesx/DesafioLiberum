import { BaseComponent } from "@src/theme/BaseComponent";
import { StyleSheet } from "@src/theme/StyleSheet";
import { ThemeTypographVariant } from "@src/theme/theme";
import { useTheme } from "@src/theme/ThemeProvider";
import React from "react";

interface TextProps {
  variant?: ThemeTypographVariant;
  children?: React.ReactNode;
  tag?: "p" | "li" | "h1" | "h2" | "a" | "button" | string;
  styleSheet?: StyleSheet;
  ref?: any;
  [key: string]: any;
}
const Text = React.forwardRef(
  ({ styleSheet, variant = "body2", tag = "p", ...props }: TextProps, ref) => {
    const theme = useTheme();
    const textVariant = theme.typography.variants[variant];

    return (
      <BaseComponent
        as={tag}
        styleSheet={{
          fontFamily: theme.typography.fontFamily,
          ...textVariant,
          ...styleSheet,
        }}
        {...props}
      />
    );
  }
);

export default Text;
