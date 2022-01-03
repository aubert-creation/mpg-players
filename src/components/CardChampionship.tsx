import { useState, useEffect } from 'react'
import PropTypes, { InferProps } from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'
import { useQuery } from 'react-query'
import { Card } from 'react-native-paper'

import { PlayerStats } from '../../types'
import { fetchPlayerStats } from '../api/PlayerAPI'

import MatchScore from '../components/MatchScore'

const CardChampionship = ({ type, player_id, title, club_id, clubs }: InferProps<typeof CardChampionship.propTypes>) => {
  const player_stats_query = useQuery<PlayerStats, Error>(['player_stats', player_id], () => fetchPlayerStats(player_id))
  const [playerStats, setPlayerStats] = useState<Object>({})

  const { matches } = playerStats[type]?.clubs[club_id] ?? {}

  useEffect(() => {
    if(player_stats_query.data?.championships) {
      setPlayerStats(player_stats_query.data?.championships)
    }
  }, [player_stats_query.isSuccess])

  if(!matches || matches.length === 0) return null

  return (
    <Card style={styles.card}>
      <Card.Title
        title={title}
      />
      <Card.Content>
        {matches.slice(0, 5).map(((match, index) => {
          const home_club = clubs[match.home.clubId]
          const away_club = clubs[match.away.clubId]

          if(!home_club || !away_club) return null

          return (
            <MatchScore
              key={`match-score-${index}`}
              home_club={home_club}
              away_club={away_club}
              score={`${match.home.score} : ${match.away.score}`}
            />
          )
        }))}
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 8
  }
})

CardChampionship.propTypes = {
  type: PropTypes.number.isRequired,
  player_id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  club_id: PropTypes.string.isRequired,
  clubs: PropTypes.object
}

export default CardChampionship
