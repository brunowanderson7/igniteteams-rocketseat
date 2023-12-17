import { Header } from '@components/Header'
import { Container, Content, Icon } from './styles'
import { Highlight } from '@components/Highlight'
import { Button } from '@components/Button'
import { Input } from '@components/Input'

export function NewGroup() {
  return (
    <Container>
      <Header showButton />

      <Content>
        <Icon />
        <Highlight
          title="Nova turma"
          subtitle="Crie uma turma para adicionar pessoas!"
        />
        <Input />
        <Button title="Criar" onPress={() => {}} style={{ marginTop: 20 }} />
      </Content>
    </Container>
  )
}
