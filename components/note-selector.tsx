import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import { AllNotes } from '../components/notes'
import Fretboard from '../components/fretboard'

export function NoteSelector({
  rightSide
}: {
  rightSide?: JSX.Element // optional JSX Element which will be rendered on the right side of the chord selector
}) {
  const [note, setNote] = useState(AllNotes[0])

  return (
    <Stack>
      <Stack direction={"horizontal"} gap={2}>
        <ButtonGroup>
          {AllNotes.map(function (chord) {
            return (
              <Button
                key={chord.name}
                variant={"outline-primary"}
                size={"sm"}
                onClick={() => setNote(chord)}>
                {chord.name}
              </Button>
            )
          })}
        </ButtonGroup>
      </Stack>
      <Stack direction={"horizontal"} gap={3}>
        <Fretboard key={"fretboard"} config={{ fretWidth: 150, fretsNumber: 12 }} notes={note} />
        {rightSide}
      </Stack>
    </Stack>
  )
}