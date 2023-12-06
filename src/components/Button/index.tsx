import { TouchableOpacityProps } from 'react-native'

import { Container, ButtonText, ButtonStyleProps } from './styles'

type ButtonProps = TouchableOpacityProps & {
  title: string
  styleProps?: ButtonStyleProps
}

export function Button({
  title,
  styleProps = 'SUCCESS',
  ...rest
}: ButtonProps) {
  return (
    <Container buttonStyle={styleProps} {...rest}>
      <ButtonText>{title}</ButtonText>
    </Container>
  )
}
