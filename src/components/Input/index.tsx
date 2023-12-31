import { TextInputProps } from 'react-native'
import { useTheme } from 'styled-components/native'

import { Container } from './styles'

export function Input({ ...rest }: TextInputProps) {
  const { colors } = useTheme()
  return <Container {...rest} placeholderTextColor={colors.gray_300} />
}
