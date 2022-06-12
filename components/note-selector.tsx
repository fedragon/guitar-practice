import { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import { AllNotes } from '../lib/notes'
import Fretboard from '../components/fretboard'

export function NoteSelector() {
  const [note, setNote] = useState(AllNotes[0])

  return (
    <Stack>
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
      <Fretboard key={"fretboard"} config={{ fretWidth: 150, fretsNumber: 12 }} notes={note} />
    </Stack>
  )
}