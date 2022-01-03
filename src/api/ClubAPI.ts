import axios from 'axios'

export const fetchClubs = async (): Object => {
  const { data } = await axios.get(
    `https://api.mpg.football/api/data/championship-clubs`
  )

  return data
}
