import 'bootstrap/dist/css/bootstrap.css'
import { Stack } from 'react-bootstrap'
import { ChordSelector } from '../components/chord-selector'
import { Timer } from '../components/timer'

export default function ChordPerfect() {
  return (
    <Stack>
      <Stack direction={"horizontal"} gap={1}>
        <ChordSelector rightSide={[]} />
        <ChordSelector rightSide={[]} />
      </Stack>
      <Timer time={60} />
    </Stack>
  )
}
