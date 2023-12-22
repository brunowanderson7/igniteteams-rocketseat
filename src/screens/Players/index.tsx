import { Header } from '@components/Header'
import { Container, Form } from './styles'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'

export function Players() {
  return (
    <Container>
      <Header showButton />
      <Highlight
        title="Nome da turma"
        subtitle="Adicione os jogadores a sua turma"
      />

      <Form>
        <Input placeholder="Nome do Jogador" autoCorrect={false} />
        <ButtonIcon icon="add" />
      </Form>

      <Filter title="Time FSO" />
    </Container>
  )
}
