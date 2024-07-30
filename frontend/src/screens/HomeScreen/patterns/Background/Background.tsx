import Box from "@src/components/Box/Box";
import { useTheme } from "@src/theme/ThemeProvider";

export default function Background() {
  const theme = useTheme();
  return (
    <Box
      styleSheet={{
        // backgroundColor: theme.colors.primary.x100,
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    />
  );
}
