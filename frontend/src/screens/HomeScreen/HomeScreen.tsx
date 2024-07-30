import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Text from "@src/components/Text/Text";
import { useTheme } from "@src/theme/ThemeProvider";
import Feed from "./patterns/Feed/Feed";
import Menu from "./patterns/Menu/Menu";

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <Box>
      <Box
        tag="main"
        styleSheet={{
          backgroundColor: theme.colors.neutral.x000,
          position: "relative",
          minHeight: "80px",
        }}
      >
        <Menu />
      </Box>

      <Box
        styleSheet={{
          paddingTop: "60px",
          position: "relative",
        }}
      >
        <Box
          styleSheet={{
            position: "absolute",
            top: "20px",
            right: "20px",
            display: "flex",
          }}
        >
          <Button
            href="/add"
            styleSheet={{
              color: theme.colors.neutral.x000,
              backgroundColor: theme.colors.primary.x500,
              padding: "4px 0 0 0",
            }}
            size="nb"
          >
            <Text variant="body4" style={{ textAlign: "center" }}>
              + Adicionar Empresa
            </Text>
          </Button>
        </Box>
        <Box
          styleSheet={{
            top: "70px",
            right: "20px",
            display: "flex",

            // marginTop: "1px",
          }}
        >
          <Feed>
            {/* <Feed.Post />*/}
            {/* <Feed.Post />*/}
            <Feed.container />
          </Feed>
        </Box>
      </Box>
    </Box>
  );
}
