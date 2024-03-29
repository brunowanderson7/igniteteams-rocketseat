import { useEffect, useState, useRef } from 'react'
import { useRoute } from '@react-navigation/native'
import { Alert, FlatList, TextInput } from 'react-native'
import { useNavigation } from '@react-navigation/native'

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
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup'
import { groupRemoveByName } from '@storage/group/groupRemoveByName'
import { Loading } from '@components/Loading'

type RouteParams = {
  group: string
}

export function Players() {
  const [loading, setLoading] = useState<boolean>(true)
  const [newPlayerName, setNewPlayerName] = useState<string>('')
  const [team, setTeam] = useState<string>('TIME A')
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([])

  const route = useRoute()
  const { group } = route.params as RouteParams

  const inputRef = useRef<TextInput>(null)
  const navigation = useNavigation()

  useEffect(() => {
    fetchPlayerByTeam()
  }, [team])

  const fetchPlayerByTeam = async () => {
    try {
      setLoading(true)
      const playerByTeam = await playersGetByGroupAndTeam(group, team)
      setPlayers(playerByTeam)
    } catch (error) {
      console.log(error)
      Alert.alert(
        'Jogadores',
        'Ocorreu um erro ao buscar os jogadores do time selecionado'
      )
    } finally {
      setLoading(false)
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

  const handleRemovePlayer = async (playerName: string) => {
    try {
      await playerRemoveByGroup(playerName, group)
      fetchPlayerByTeam()
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Jogador', 'Ocorreu um erro ao remover o jogador')
    }
  }

  const groupRemove = async () => {
    try {
      await groupRemoveByName(group)
      navigation.navigate('groups')
    } catch (error) {
      console.log(error)
      Alert.alert('Remover Time', 'Ocorreu um erro ao remover o time')
    }
  }

  const handleRemoveGroup = async () => {
    Alert.alert('Remover Time', 'Deseja realmente remover esse time?', [
      { text: 'Não', style: 'cancel' },
      {
        text: 'Sim',
        onPress: groupRemove,
      },
    ])
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

      {!loading ? (
        <FlatList
          data={players}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <PlayerCard
              name={item.name}
              onRemove={() => {
                handleRemovePlayer(item.name)
              }}
            />
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
      ) : (
        <Loading />
      )}

      <Button
        title="Remover Time"
        styleProps="DANGER"
        onPress={handleRemoveGroup}
      />
    </Container>
  )
}
