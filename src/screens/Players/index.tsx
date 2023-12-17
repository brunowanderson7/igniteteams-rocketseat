import { Header } from '@components/Header'
import { Container } from './styles'
import { Highlight } from '@components/Highlight'

export function Players() {
  return (
    <Container>
      <Header showButton />
      <Highlight
        title="Nome da turma"
        subtitle="Adicione os jogadores a sua turma"
      />
    </Container>
  )
}
