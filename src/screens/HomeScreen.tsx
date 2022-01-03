import { useState, useEffect } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { useQuery } from 'react-query'
import { DataTable, Searchbar } from 'react-native-paper'

import { RootStackScreenProps, Player } from '../types'
import { fetchPlayers } from '../api/PlayerAPI'
import Position from '../constants/Position'
import { getPlayerName } from '../utils/player'

import PositionFilterModal from '../components/PositionFilterModal'

const HomeScreen = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const apiResponse = useQuery<Player[], Error>('players', fetchPlayers)
  const [players, setPlayers] = useState<Player[]>([])
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [sortAsc, setSortAsc] = useState<boolean>(false)
  const [searchText, setSearchText] = useState<string>('')
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [positions, setPositions] = useState<object>({})

  useEffect(() => {
    if(apiResponse.data?.poolPlayers?.length > 0) {
      setPlayers(sort(apiResponse.data.poolPlayers))
    }
  }, [apiResponse.isSuccess, sortAsc])

  useEffect(() => {
    let filtered_players = search()
    filtered_players = filter(filtered_players)

    setFilteredPlayers(filtered_players)
  }, [players, searchText, positions])


  const sort = (datas: Player[]): Player[] => {
    return datas.slice().sort((player1, player2) =>
      (sortAsc ? player1.lastName < player2.lastName : player2.lastName < player1.lastName)
        ? 1
        : -1
    )
  }

  const search = (): Player[] => {
    return players.filter((player) => {
      const display_name = getPlayerName(player)
      return display_name.includes(searchText)
    })
  }

  const filter = (datas: Player[]): Player[] => {
    let selected_positions = Object.keys(positions).filter((i) => positions[i] === true)

    let filtered = datas

    if(selected_positions.length > 0) {
      filtered = filtered.filter((player) => {
        return selected_positions.includes(`${player.ultraPosition}`)
      })
    }

    return filtered
  }

  const renderRow = ({ item }): DataTable.Row => {
    const display_name = getPlayerName(item)

    return (
      <DataTable.Row
        onPress={() => navigation.push('Player', {id: item.id, player: item})}
      >
        <DataTable.Cell style={styles.name}>{display_name}</DataTable.Cell>
        <DataTable.Cell style={styles.pos}>{Position.short[item.ultraPosition]}</DataTable.Cell>
      </DataTable.Row>
    )
  }

  const getSelectedPosCount = (): string => {
    let selected_count = Object.keys(positions).filter((i) => positions[i] === true).length

    if(selected_count > 0) {
      return `(${selected_count})`
    }

    return ''
  }

  return (
    <View>
      <Searchbar
        placeholder='rechercher'
        onChangeText={(value) => setSearchText(value)}
        value={searchText}
      />
      <DataTable>
        <DataTable.Header>
          <DataTable.Title
            style={styles.name}
            sortDirection={sortAsc ? 'ascending' : 'descending'}
            onPress={() => setSortAsc(!sortAsc)}
          >
            Nom
          </DataTable.Title>
          <DataTable.Title
            style={styles.pos}
            onPress={() => setModalVisible(true)}
          >
            Position {getSelectedPosCount()}
          </DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={filteredPlayers}
          renderItem={renderRow}
          keyExtractor={item => item.id}
        />
      </DataTable>
      <PositionFilterModal
        visible={modalVisible}
        positions={positions}
        onDismiss={() => setModalVisible(false)}
        onSelect={(choices) => setPositions(choices)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  name: {
    flex: 2,
    flexGrow: 1
  },
  pos: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})

export default HomeScreen
