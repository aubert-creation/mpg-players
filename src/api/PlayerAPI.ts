import axios from 'axios'

export const fetchPlayers = async (): Object => {
  const { data } = await axios.get(
    'https://api.mpg.football/api/data/championship-players-pool/1'
  )

  return data
}


export const fetchPlayerStats = async (id: string): Object => {
  const { data } = await axios.get(
    `https://api.mpg.football/api/data/championship-player-stats/${id}/2021`
  )
  return data
}
