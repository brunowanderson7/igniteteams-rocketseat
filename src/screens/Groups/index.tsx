import { useState, useCallback } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native'

import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { FlatList } from 'react-native'
import { ListEmpty } from '@components/ListEmpty'
import { Button } from '@components/Button'
import * as S from './styles'
import { groupsGetAll } from '@storage/group/groupsGetAll'

export function Groups() {
  const [groups, setGroups] = useState<string[]>([])
  const navigation = useNavigation()

  useFocusEffect(
    useCallback(() => {
      const fetchGroups = async () => {
        try {
          const data = await groupsGetAll()
          setGroups(data)
        } catch (error) {
          console.log(error)
        }
      }

      fetchGroups()
    }, [])
  )

  const handleNewGroup = () => {
    navigation.navigate('new')
  }

  const handleOpenGroup = (group: string) => {
    navigation.navigate('players', { group })
  }

  return (
    <S.Container>
      <Header />
      <Highlight title="Turma" subtitle="Jogue com sua turma" />

      <FlatList
        data={groups}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <GroupCard title={item} onPress={() => handleOpenGroup(item)} />
        )}
        contentContainerStyle={groups.length === 0 && { flex: 1 }}
        ListEmptyComponent={() => (
          <ListEmpty message={'Não há turmas cadastradas!'} />
        )}
      />
      <Button title="Criar turma" onPress={handleNewGroup} />
    </S.Container>
  )
}
