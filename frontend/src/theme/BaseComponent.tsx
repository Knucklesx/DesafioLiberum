import { parseStyleSheet } from "@skynexui/responsive_stylesheet";
import { StyleSheet } from "@src/theme/StyleSheet";
import styled from "styled-components";

interface StyledBaseComponentProps {
  styleSheet?: StyleSheet;
}

const StyledBaseComponent = styled.div<StyledBaseComponentProps>`
  display: flex;
  flex-direction: column;
  align-content: flex-start;
  flex-shrink: 0;
  ${({ styleSheet }) => parseStyleSheet(styleSheet)}
`;

export const BaseComponent = ({ styleSheet = {}, ...props }) => {
  return <StyledBaseComponent styleSheet={styleSheet} {...props} />;
};
