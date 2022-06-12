import 'bootstrap/dist/css/bootstrap.css'
import { Stack } from 'react-bootstrap'
import { NoteSelector } from '../components/note-selector'
import { Timer } from '../components/timer'

export default function ChordPerfect() {
  return (
    <Stack>
      <NoteSelector />
      <Timer time={60} />
    </Stack>
  )
}
