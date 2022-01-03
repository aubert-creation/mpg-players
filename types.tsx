
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Home: undefined;
  Player: undefined;
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export interface Player {
  id: string,
  firstName?: string | null,
  lastName?: string | null,
  clubId?: string | null,
  position: number,
  ultraPosition: number,
  quotation?: number | null,
  stats: object
}

export interface PlayerStats {
  id: string,
  position: number,
  type: string,
  ultraPosition: number,
  championships: object
}
