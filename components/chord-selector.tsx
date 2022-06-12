import { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import { AllChords } from '../components/chords'
import Fretboard from '../components/fretboard'

export function ChordSelector() {
  const [chord, setChord] = useState(AllChords[0])

  return (
    <Stack>
      <ButtonGroup>
        {AllChords.map(function (chord) {
          return (
            <Button
              key={chord.name}
              variant={"outline-primary"}
              size={"sm"}
              onClick={() => setChord(chord)}>
              {chord.name}
            </Button>
          )
        })}
      </ButtonGroup>
      <Fretboard key={"fretboard"} config={{ fretWidth: 90, fretsNumber: 4 }} notes={chord} />
    </Stack>
  )
}