import AsyncStorage from '@react-native-async-storage/async-storage';

import { PLAYER_COLECTION } from '@storage/storageConfig';
import { playersGetByGroup } from './playersGetByGroup';

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playersGetByGroup(group)
    const filtred = storage.filter(player => player.name !== playerName)

    await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`, JSON.stringify(filtred))
  } catch (error) {
    throw error
  }
}