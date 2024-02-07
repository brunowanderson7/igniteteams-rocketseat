import AsyncStorage from '@react-native-async-storage/async-storage'

import { GROUP_COLECTION } from '@storage/storageConfig'
import { groupsGetAll } from './groupsGetAll'
import { AppError } from '@utils/AppError'


export async function groupCreate(groupName: string) {

  try {
    const storedGoups = await groupsGetAll()
    const groupAlreadyExists = storedGoups.includes(groupName)

    if (groupAlreadyExists) {
      throw new AppError('Já existe uma turma com esse nome!')
    }

    await AsyncStorage.setItem(GROUP_COLECTION, JSON.stringify([...storedGoups, groupName]))
  } catch (error) {
    throw error
  }
}