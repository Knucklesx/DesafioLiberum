import { useTheme } from "@src/theme/ThemeProvider";
import React from "react";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";
import { buttonSize, ButtonSize } from "./ButtonSize";
import { ColorVariant, colorVariantBy, Variant } from "./colorVariantBy";

interface ButtonProps extends ButtonBaseProps {
  children: React.ReactNode;
  fullWidth?: boolean;
  colorVariant?: ColorVariant;
  variant?: Variant;
  size?: ButtonSize;
  [key: string]: any;
}

export default function Button({
  fullWidth = false,
  styleSheet,
  colorVariant = "primary",
  variant = "contained",
  size = "xl",
  children,
  ...props
}: ButtonProps) {
  const theme = useTheme();
  return (
    <ButtonBase
      styleSheet={{
        alignSelf: "flex-start",
        ...colorVariantBy(theme, colorVariant, variant),
        ...buttonSize[size],
        ...(fullWidth && {
          alignSelf: "initial",
        }),
        ...styleSheet,
      }}
      {...props}
    >
      {children}
    </ButtonBase>
  );
}

Button.Base = ButtonBase;
