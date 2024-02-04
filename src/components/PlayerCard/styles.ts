import styled, { css } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  height: 56px;

  background-color: ${({ theme }) => theme.colors.gray_500};

  flex-direction: row;
  align-items: center;

  margin-bottom: 16px;
  border-radius: 6px;
`

export const Name = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray_200};
    font-family: ${theme.font_family.regular};
    font-size: ${theme.font_size.md}px;
  `}
  flex: 1;
`

export const Icon = styled(MaterialIcons).attrs(({ theme }) => ({
  size: 24,
  color: theme.colors.gray_200 
}))`
  margin-right: 4px;
  margin-left: 16px;
`