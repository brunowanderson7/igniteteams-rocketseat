import { useNavigation } from '@react-navigation/native'
import * as S from './styles'

import Logo from '@assets/logo.png'

type HeaderProps = {
  showButton?: boolean
}

export function Header({ showButton = false }: HeaderProps) {
  const navigation = useNavigation()
  const handleBack = () => {
    navigation.navigate('groups')
  }
  return (
    <S.Container>
      {showButton && (
        <S.BackButton onPress={handleBack}>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={Logo} />
    </S.Container>
  )
}
