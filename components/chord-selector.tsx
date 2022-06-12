import { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import { AllChords, Major, Minor, Place } from '../lib/chords'
import Fretboard from '../components/fretboard'

export function ChordSelector() {
  const [chord, setChord] = useState({ name: "A", startingFret: 1, positions: Place(Major("A"), 1, 3) })

  let doChord = function (name: string, root: string, type: string) {
    let computed = []
    if (type == "major") {
      computed = Place(Major(root), 1, 3)
    } else if (type == "minor") {
      computed = Place(Minor(root), 1, 3)
    }
    let chord = { name: name, startingFret: 1, positions: computed }
    console.log('chord', chord)
    setChord(chord)
  }

  return (
    <Stack>
      <ButtonGroup>
        {AllChords.map(function (x: { name: string, root: string, type: string }) {
          return (
            <Button
              key={x.name}
              variant={"outline-primary"}
              size={"sm"}
              onClick={() => doChord(x.name, x.root, x.type)}>
              {x.name}
            </Button>
          )
        })}
      </ButtonGroup>
      <Fretboard key={"fretboard"} config={{ fretWidth: 90, fretsNumber: 4 }} notes={chord} />
    </Stack>
  )
}