import PropTypes, { InferProps } from 'prop-types'
import { StyleSheet, Text, View, Image } from 'react-native'

const Club = ({ jacket_url, name }: InferProps<typeof Club.propTypes>) => (
  <View style={styles.club}>
    <Image
      source={{uri: jacket_url}}
      style={[styles.jersey]}
    />
    <Text>{name}</Text>
  </View>
)

const styles = StyleSheet.create({
  club: {
    margin: 6,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  jersey: {
    width: 28,
    height: 28
  }
})

Club.propTypes = {
  jacket_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}

export default Club
