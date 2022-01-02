import { Dialog, Portal, Button, Checkbox } from 'react-native-paper'
import PropTypes, { InferProps } from 'prop-types'

import Position from '../constants/Position'

const PositionFilterModal = ({ visible, positions, onDismiss, onSelect }: InferProps<typeof PositionFilterModal.propTypes>) => (
  <Portal>
    <Dialog visible={visible} onDismiss={() => onDismiss(false)}>
      <Dialog.Title>Positions</Dialog.Title>
      <Dialog.Content>
        {Object.entries(Position.long).map(([key, pos]) => (
          <Checkbox.Item
            key={key}
            label={pos}
            status={positions[key] ? 'checked' : 'unchecked'}
            onPress={() => {
              onSelect({...positions, [key]: !positions[key]})
            }}
          />
        ))}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={() => onDismiss(false)}>Valider</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>
)

PositionFilterModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  positions: PropTypes.object.isRequired,
  onDismiss: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired
}

export default PositionFilterModal
