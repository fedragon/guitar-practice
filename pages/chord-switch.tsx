import { Stack } from 'react-bootstrap'
import { ChordSelector } from '../components/chord-selector'
import { Timer } from '../components/timer'

export default function ChordSwitch() {
  return (
    <Stack>
      <Stack direction={"horizontal"} gap={3}>
        <ChordSelector />
        <ChordSelector />
      </Stack>
      <Timer time={60} />
    </Stack>
  )
}
