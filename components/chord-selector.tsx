import { useState } from 'react'
import { Button, ButtonGroup, Stack } from 'react-bootstrap'
import { AllChords, Chord, ChordSpec, Major, Minor, Place } from '../lib/chords'
import Fretboard from '../components/fretboard'

const defaultChord: Chord =
  Place(AllChords[0].name, Major(AllChords[0].root), AllChords[0].startingFret, 3)

export function ChordSelector() {
  const [chord, setChord] = useState(defaultChord)

  let doChord = function (x: ChordSpec) {
    let chord: Chord

    if (x.type === 'major') {
      chord = Place(x.name, Major(x.root), x.startingFret, 3)
    } else if (x.type === "minor") {
      chord = Place(x.name, Minor(x.root), x.startingFret, 3)
    }
    console.log('chord', chord)
    setChord(chord)
  }

  return (
    <Stack>
      <ButtonGroup>
        {AllChords.map(function (x: ChordSpec) {
          return (
            <Button
              key={x.name}
              variant={"outline-primary"}
              size={"sm"}
              onClick={() => doChord(x)}>
              {x.name}
            </Button>
          )
        })}
      </ButtonGroup>
      <Fretboard key={"fretboard"} config={{ fretWidth: 90, fretsNumber: 4 }} notes={chord} />
    </Stack>
  )
}