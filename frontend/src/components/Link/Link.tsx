import { StyleSheet } from "@src/theme/StyleSheet";
import { ThemeTypographVariant } from "@src/theme/theme";
import { useTheme } from "@src/theme/ThemeProvider";
import NextLink from "next/link";
import React from "react";
import Text from "../Text/Text";

interface LinkProps {
  href: string;
  children: React.ReactNode;
  styleSheet?: StyleSheet;
  variant?: ThemeTypographVariant;
  colorVariant?:
    | string
    | "primary"
    | "accent"
    | "neutral"
    | "success"
    | "warning"
    | "negative";
  colorVariantEnabled?: boolean;
}

const Link = React.forwardRef(
  (
    {
      href,
      children,
      colorVariant = "primary",
      styleSheet,
      colorVariantEnabled = true,
      ...props
    }: LinkProps,
    ref
  ) => {
    const isExternal = href.startsWith("http");
    const theme = useTheme();

    const currentColorSet = {
      color: theme.colors[colorVariant].x500,
      hover: {
        color: theme.colors[colorVariant].x400,
      },
      focus: {
        color: theme.colors[colorVariant].x600,
      },
    };

    const linkProps = {
      tag: "a",
      ref,
      children,
      href,
      styleSheet: {
        textDecoration: "none",
        ...(colorVariantEnabled && {
          color: currentColorSet.color,
        }),
        ...styleSheet,
        hover: {
          ...styleSheet?.hover,
          ...(colorVariantEnabled && {
            color: currentColorSet.hover.color,
          }),
        },
        focus: {
          ...styleSheet?.focus,
          ...(colorVariantEnabled && {
            color: currentColorSet.focus.color,
          }),
        },
      },
      ...props,
    };

    if (isExternal) {
      return <Text {...{ ...linkProps, target: "_blank" }} />;
    }

    return (
      <NextLink legacyBehavior href={href} passHref>
        <Text {...linkProps} />
      </NextLink>
    );
  }
);

export default Link;
