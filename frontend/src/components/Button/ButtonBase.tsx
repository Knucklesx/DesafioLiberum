import { StyleSheet } from "@src/theme/StyleSheet";
import { ThemeTypographVariant } from "@src/theme/theme";
import { useRouter } from "next/router";
import React from "react";
import styled from "styled-components";
import Text from "../Text/Text";

export interface ButtonBaseProps {
  children?: React.ReactNode;
  textVariant?: ThemeTypographVariant;
  styleSheet?: StyleSheet;
  href?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
const toKebabCase = (str: string) =>
  str.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2").toLowerCase();

const StyledButton = styled(Text)<{ styleSheet?: StyleSheet }>`
  ${({ styleSheet }) =>
    styleSheet
      ? Object.entries(styleSheet)
          .map(([key, value]) => {
            const cssKey = toKebabCase(key);
            if (typeof value === "object" && value !== null) {
              return Object.entries(value)
                .map(
                  ([breakpoint, responsiveValue]) =>
                    `${cssKey}: ${responsiveValue};`
                )
                .join("");
            } else {
              return `${cssKey}: ${value};`;
            }
          })
          .join("")
      : ""}
`;

export default function ButtonBase({
  textVariant,
  children,
  styleSheet,
  href,
  ...props
}: ButtonBaseProps) {
  const router = useRouter();

  const isLink = Boolean(href);
  const Tag = isLink ? "a" : "button";

  return (
    <StyledButton
      as={Tag}
      styleSheet={{
        backgroundColor: "transparent",
        color: "inherit",
        border: "0",
        outline: "0",
        cursor: "pointer",
        textDecoration: "none",
        ...styleSheet,
      }}
      onClick={(event) => {
        isLink && event.preventDefault();
        isLink && router.push(href);
        !isLink && props.onClick && props.onClick(event);
      }}
      {...props}
    >
      {children}
    </StyledButton>
  );
}
