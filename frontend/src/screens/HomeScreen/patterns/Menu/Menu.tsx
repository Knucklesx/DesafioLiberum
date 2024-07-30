import Box from "@src/components/Box/Box";
import Button from "@src/components/Button/Button";
import Icon from "@src/components/Icon/Icon";
import Text from "@src/components/Text/Text";
import { useTheme } from "@src/theme/ThemeProvider";

export default function Menu() {
  const theme = useTheme();

  return (
    <Box
      styleSheet={{
        position: "absolute",
        left: 0,
        top: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: "16px",
        paddingHorizontal: "20px",
        color: theme.colors.neutral.x000,
        borderBottom: `1px solid ${theme.colors.neutral.x050}`,
        boxShadow: "0 0px 10px -1px gray",
      }}
    >
      <Box>
        <Button.Base
          styleSheet={{
            color: "gray",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: "10px",
            paddingVertical: "8px",
          }}
        >
          <Text>Portal Administrador</Text>
        </Button.Base>
      </Box>
      <Box styleSheet={{ flexDirection: "row", alignItems: "center" }}>
        <Button.Base
          styleSheet={{
            color: theme.colors.negative.x500,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: "10px",
            paddingVertical: "8px",
            marginRight: "100px",
          }}
        >
          <Text>Administrador</Text>
        </Button.Base>
        <Button.Base
          styleSheet={{
            color: theme.colors.neutral.x000,
            borderRadius: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="menuPerson" size="lg" />
        </Button.Base>
      </Box>
    </Box>
  );
}
