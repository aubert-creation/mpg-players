import PropTypes, { InferProps } from 'prop-types'
import { StyleSheet, Text, View } from 'react-native'

import Club from '../components/Club'

const MatchScore = ({ home_club, away_club, score }: InferProps<typeof MatchScore.propTypes>) => (
  <View style={styles.match}>
    <Club
      jacket_url={home_club.defaultJerseyUrl}
      name={home_club.shortName}
    />
    <View style={styles.score}>
      <Text>{score}</Text>
    </View>
    <Club
      jacket_url={away_club.defaultJerseyUrl}
      name={away_club.shortName}
    />
  </View>
)

const styles = StyleSheet.create({
  match: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1
  },
  score: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})

MatchScore.propTypes = {
  home_club: PropTypes.object.isRequired,
  away_club: PropTypes.object.isRequired,
  score: PropTypes.string.isRequired
}

export default MatchScore
