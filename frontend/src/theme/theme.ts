import { colors } from "./default/colors";
import { typography } from "./default/typography";

const theme = {
  typography,
  colors,
};

export type Theme = typeof theme;
export type ThemeTypographVariant = keyof typeof theme.typography.variants;

export default theme;
