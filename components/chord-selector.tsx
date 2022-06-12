import 'bootstrap/dist/css/bootstrap.css'
import { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import { AllChords } from '../components/chords'
import Fretboard from '../components/fretboard'

export function ChordSelector({
  rightSide
}: {
  rightSide?: JSX.Element // optional JSX Element which will be rendered on the right side of the chord selector
}) {
  const [chord, setChord] = useState(AllChords[0])

  return (
    <Stack>
      <Stack direction={"horizontal"} gap={2}>
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
      </Stack>
      <Stack direction={"horizontal"} gap={3}>
        <Fretboard key={"fretboard"} config={{ fretWidth: 90, fretsNumber: 4 }} notes={chord} />
        {rightSide}
      </Stack>
    </Stack>
  )
}