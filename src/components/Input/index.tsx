import { TextInput, TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

type InputProps = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: InputProps) {
  const { colors } = useTheme()
  return (
    <Container
      {...rest}
      ref={inputRef}
      placeholderTextColor={colors.gray_300}
    />
  )
}
