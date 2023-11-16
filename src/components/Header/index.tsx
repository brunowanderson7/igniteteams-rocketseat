import * as S from './styles'

import Logo from '@assets/logo.png'

type HeaderProps = {
  showButton?: boolean
}

export function Header({ showButton = false }: HeaderProps) {
  return (
    <S.Container>
      {showButton && (
        <S.BackButton>
          <S.BackIcon />
        </S.BackButton>
      )}
      <S.Logo source={Logo} />
    </S.Container>
  )
}
