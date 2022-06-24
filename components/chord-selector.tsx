import {useEffect, useState} from 'react'
import {Button, ButtonGroup, Stack} from 'react-bootstrap'
import {Major, Minor, Place} from '../lib/chords'
import Fretboard from '../components/fretboard'
import {AllNotes} from "../lib/notes";

function invert(notes: string[], suffix: string, n: number): { name: string, notes: string[] } {
    let name = notes[0] + suffix
    let result = notes

    if (n > 0) {
        name += "/" + notes[n]
        result = notes.slice(n).concat(notes.slice(0, n))
    }

    return {name: name, notes: result}
}

export function ChordSelector() {
    const [root, setRoot] = useState("A")
    const [chords, setChords] = useState([])
    const [chord, setChord] = useState({name: root, notes: Major(root)})
    const [fret, setFret] = useState(0)
    const [placement, setPlacement] = useState(undefined)

    useEffect(() => {
        let major = Major(root)
        let minor = Minor(root)

        setChords([
            {name: root, notes: major},
            invert(major, "", 1),
            invert(major, "", 2),
            {name: root + "m", notes: minor},
            invert(minor, "m", 1),
            invert(minor, "m", 2),
        ])
    }, [root])

    useEffect(() => {
        if (chord) {
            let notes = Place(chord.name, chord.notes, fret, 4)
            if (notes && notes.positions) {
                let max = notes.positions.map(x => x.fret).reduce((prev: number, curr: number) => {
                    return (curr > prev) ? curr : prev
                })

                if (max <= 4) {
                    setPlacement(notes)
                } else {
                    setPlacement(undefined)
                }
            } else {
                setPlacement(undefined)
            }
        }
    }, [chord, fret])

    return (
        <Stack gap={1}>
            <ButtonGroup>
                {AllNotes.map(x => {
                    return (
                        <Button
                            key={"notes-" + x.name}
                            variant={"outline-primary"}
                            size={"sm"}
                            active={root === x.name}
                            onClick={() => setRoot(x.name)}>
                            {x.name}
                        </Button>
                    )
                })}
            </ButtonGroup>
            <ButtonGroup>
                {chords.map(x => {
                    return (
                        <Button
                            key={"chords-" + x.name}
                            variant={"outline-primary"}
                            size={"sm"}
                            active={chord.name === x.name}
                            onClick={() => setChord(x)}>
                            {x.name}
                        </Button>
                    )
                })
                }
            </ButtonGroup>
            <ButtonGroup>
                {Array.from(Array(13).keys()).map(x => {
                    return (
                        <Button
                            key={"fret-" + x}
                            variant={"outline-primary"}
                            size={"sm"}
                            active={fret === x}
                            onClick={() => setFret(x)}>
                            {x}
                        </Button>
                    )
                })}
            </ButtonGroup>
            {placement && <Fretboard key={"fretboard"} config={{fretWidth: 90, fretsNumber: 4}} notes={placement}/>}
        </Stack>
    )
}