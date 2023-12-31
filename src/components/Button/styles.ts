import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonStyleProps = 'SUCCESS' | 'DANGER'

type ButtonProps = {
  buttonStyle: ButtonStyleProps
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
  flex: 1;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ theme, buttonStyle }) => buttonStyle === 'SUCCESS' ? theme.colors.green_700 : theme.colors.red_dark};

  border-radius: 6px;

  align-items: center;
  justify-content: center;
`

export const ButtonText = styled.Text`
${({ theme }) => css`
  font-family: ${theme.font_family.bold};
  font-size: ${theme.font_size.md}px;
  color: ${theme.colors.white};
`}
  
`