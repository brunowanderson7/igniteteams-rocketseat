import { TouchableOpacityProps } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { Container, Icon, ButtonIconStyle } from './styles'

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap
  type?: ButtonIconStyle
}

export function ButtonIcon({ icon, type = 'PRIMARY', ...rest }: Props) {
  return (
    <Container>
      <Icon name={icon} type={type} />
    </Container>
  )
}
