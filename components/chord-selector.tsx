import {useEffect, useState} from 'react'
import {Button, ButtonGroup, Stack} from 'react-bootstrap'
import {Chord, Major, Minor, Place} from '../lib/chords'
import Fretboard from '../components/fretboard'
import {AllNotes} from "../lib/notes";

export function ChordSelector() {
  const [note, setNote] = useState("A")
  const [type, setType] = useState("major")
  const [fret, setFret] = useState(0)
  const [chord, setChord] = useState(Place(note, ["A", "C", "E"], fret, 3))

  useEffect(() => {
    let chord: Chord

    if (type === 'major') {
      chord = Place("", Major(note), fret, 3)
    } else if (type === "minor") {
      chord = Place("", Minor(note), fret, 3)
    }

    if(chord !== undefined) {
      setChord(chord)
    }
  }, [note, type, fret])

  return (
    <Stack gap={1}>
      <ButtonGroup>
        {AllNotes.map(x => {
          return (
            <Button
              key={"notes-" + x.name}
              variant={"outline-primary"}
              size={"sm"}
              active={note === x.name}
              onClick={() => setNote(x.name)}>
              {x.name}
            </Button>
          )
        })}
      </ButtonGroup>
      <ButtonGroup>
        <Button
          key={"chord-major"}
          variant={"outline-secondary"}
          size={"sm"}
          active={type === "major"}
          onClick={() => setType("major")}>
          maj
        </Button>
        <Button
          key={"chord-minor"}
          variant={"outline-secondary"}
          size={"sm"}
          active={type === "minor"}
          onClick={() => setType("minor")}>
          min
        </Button>
      </ButtonGroup>
      <ButtonGroup>
        {Array.from(Array(13).keys()).map(function (x: number) {
          return (
            <Button
              key={"fret-" + x}
              variant={"outline-secondary"}
              size={"sm"}
              active={fret === x}
              onClick={() => setFret(x)}>
              {x}
            </Button>)
        })}
      </ButtonGroup>
      <Fretboard key={"fretboard"} config={{fretWidth: 90, fretsNumber: 4}} notes={chord}/>
    </Stack>
  )
}