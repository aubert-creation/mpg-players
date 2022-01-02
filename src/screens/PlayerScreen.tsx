import { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, Image } from 'react-native'
import { useQuery } from 'react-query'
import { Card } from 'react-native-paper'

import { RootStackScreenProps } from '../types'
import { getPlayerName } from '../utils/player'
import { fetchClubs } from '../api/ClubAPI'
import Position from '../constants/Position'

import CardChampionship from '../components/CardChampionship'

const PlayerScreen = ({ route }: RootStackScreenProps<'Player'>) => {
  const { player, id } = route.params
  const clubs_query = useQuery(['clubs'], fetchClubs)
  const [clubs, setClubs] = useState<object>({})

  useEffect(() => {
    if(clubs_query.data?.championshipClubs) {
      setClubs(clubs_query.data?.championshipClubs)
    }
  }, [clubs_query.isSuccess])

  return (
    <ScrollView
      alwaysBounceVertical={false}
      showsVerticalScrollIndicator={false}
    >
      <Card style={styles.card}>
        <Card.Title
          title={getPlayerName(player)}
        />
        <Card.Content>
          <Text>{`Club: ${clubs[player.clubId]?.name['fr-FR']}`}</Text>
          <Text>{`Position: ${Position.long[player.ultraPosition]}`}</Text>
          <Text>{`Matchs: ${player.stats?.totalPlayedMatches ?? 0}`}</Text>
          <Text>{`Note moyenne: ${player.stats.averageRating?.toFixed(2) ?? 0}`}</Text>
        </Card.Content>
      </Card>
      <CardChampionship
        type={1}
        title='Ligue 1'
        player_id={id}
        club_id={player.clubId}
        clubs={clubs}
      />
      <CardChampionship
        type={6}
        title='Ligue des Champions'
        player_id={id}
        club_id={player.clubId}
        clubs={clubs}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 8
  }
})

export default PlayerScreen
