
export const getPlayerName = (player: object): string => {
  return `${player.firstName ?? ''} ${player.lastName ?? ''}`.trim()
}
