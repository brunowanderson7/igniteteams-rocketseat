import { useEffect, useState, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import { Alert, FlatList, TextInput } from 'react-native'

import { Container, Form, HeaderList, NumberPlayers } from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { ButtonIcon } from '@components/ButtonIcon'
import { Input } from '@components/Input'
import { Filter } from '@components/Filter'
import { PlayerCard } from '@components/PlayerCard'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import { AppError } from '@utils/AppError'
import { playerAddByGroup } from '@storage/player/playerAddByGroup'
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam'
import { PlayerStorageDTO } from '@storage/player/playerStorageDTO'

type RouteParams = {
  group: string
}

export function Players() {
  const [newPlayerName, setNewPlayerName] = useState<string>('')
  const [team, setTeam] = useState<string>('TIME A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  const inputRef = useRef<TextInput>(null)

  useEffect(() => {
    fetchPlayerByTeam()
  }, [team])

  const fetchPlayerByTeam = async () => {
    try {
      const playerByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playerByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Jogadores',
        'Ocorreu um erro ao buscar os jogadores do time selecionado'
      )
    }
  }

  const handleAddPlayer = async () => {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Novo Jogador', 'Insira o nome do jogador')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }

    try {
      await playerAddByGroup(newPlayer, group)
      inputRef.current?.blur()
      setNewPlayerName('')
      fetchPlayerByTeam()
    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Novo Jogador', error.message)
      } else {
        console.log(error)
        Alert.alert('Novo Jogador', 'Ocorreu um erro ao adicionar o jogador')
      }
    }
  }

  return (
    <Container>
      <Header showButton />
      <Highlight title={group} subtitle="Adicione os jogadores a sua turma" />

      <Form>
        <Input
          inputRef={inputRef}
          placeholder="Nome do Jogador"
          onChangeText={setNewPlayerName}
          value={newPlayerName}
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer} // chama a função o pressionar o enter do teclado
          returnKeyType="done"
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer} />
      </Form>

      <HeaderList>
        <FlatList
          data={['TIME A', 'TIME B']}
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
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PlayerCard name={item.name} onRemove={() => {}} />
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
