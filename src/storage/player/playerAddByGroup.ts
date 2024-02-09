import AsyncStorage from "@react-native-async-storage/async-storage"
import { AppError } from "@utils/AppError"

import { PLAYER_COLECTION } from "@storage/storageConfig"
import { PlayerStorageDTO } from "./playerStorageDTO"
import { playersGetByGroup } from "./playersGetByGroup"

export async function playerAddByGroup(newPlayer: PlayerStorageDTO, group: string) {
  try {
    const stored = await playersGetByGroup(group)
    const playerAlreadyExists = stored.filter((player) => player.name === newPlayer.name)

    if (playerAlreadyExists.length > 0) {
      throw new AppError('Jogador já está cadastrado em um time!')
    }

    await AsyncStorage.setItem(`${PLAYER_COLECTION}-${group}`, JSON.stringify([...stored, newPlayer]))
    
  } catch (error) {
    throw error
  }
}
