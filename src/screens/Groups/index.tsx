import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import * as S from './styles'

export function Groups() {
  return (
    <S.Container>
      <Header />
      <Highlight
        title="Turma"
        subtitle="Jogue com sua turma"
      />
      <GroupCard title="Time UMM " />
    </S.Container>
  )
}
