import { useState } from 'react'
import { FlatList } from 'react-native'

import { Container, Form, HeaderList, NumberPlayers } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'

export function Players() {
  const [team, setTeam] = useState<string>('FOR')
  const [players, setPlayers] = useState<string[]>([])
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

      <HeaderList>
        <FlatList
          data={['FOR', 'FSO']}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
          horizontal
        />

        <NumberPlayers>{players.length}</NumberPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <PlayerCard name={item} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message={'Não há jogadores nesse time!'} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Time" styleProps="DANGER" />
    </Container>
  )
}
