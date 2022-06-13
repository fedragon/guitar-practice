import {useEffect, useState} from 'react'
import {Button, ButtonGroup, Stack} from 'react-bootstrap'
import {Major, Minor, Place} from '../lib/chords'
import Fretboard from '../components/fretboard'
import {AllNotes} from "../lib/notes";
import {GroupOfNotes} from "../lib/types";

export function ChordSelector() {
    const [root, setRoot] = useState("A")
    const [type, setType] = useState("major")
    const [fret, setFret] = useState(0)
    const [inversion, setInversion] = useState(0)
    const [chord, setChord] = useState(Place(root, ["A", "C", "E"], fret, 3))

    useEffect(() => {
        let notes: string[]
        let name: string
        let chord: GroupOfNotes

        if (type === 'major') {
            notes = Major(root)
        } else if (type === "minor") {
            notes = Minor(root)
        }

        switch (inversion) {
            case 0:
                name = notes[0] + (type === "major" ? "" : "m")
                break
            case 1:
                name = notes[0] + (type === "major" ? "" : "m") + "/" + notes[1]
                notes = notes.slice(1).concat(notes.slice(0, 1))
                break
            case 2:
                name = notes[0] + (type === "major" ? "" : "m") + "/" + notes[2]
                notes = notes.slice(2).concat(notes.slice(0, 2))
                break
        }

        console.log('######## notes', notes)

        chord = Place(name, notes, fret, 3)

        if (chord !== undefined) {
            setChord(chord)
        }
    }, [root, type, fret, inversion])

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
                <Button
                    key={"chord-major"}
                    variant={"outline-primary"}
                    size={"sm"}
                    active={type === "major"}
                    onClick={() => setType("major")}>
                    maj
                </Button>
                <Button
                    key={"chord-minor"}
                    variant={"outline-primary"}
                    size={"sm"}
                    active={type === "minor"}
                    onClick={() => setType("minor")}>
                    min
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                <Button
                    key={"inversion-root"}
                    variant={"outline-primary"}
                    size={"sm"}
                    active={inversion === 0}
                    onClick={() => setInversion(0)}>
                    {"root"}
                </Button>
                <Button
                    key={"inversion-1st"}
                    variant={"outline-primary"}
                    size={"sm"}
                    active={inversion === 1}
                    onClick={() => setInversion(1)}>
                    {"1st"}
                </Button>
                <Button
                    key={"inversion-2nd"}
                    variant={"outline-primary"}
                    size={"sm"}
                    active={inversion === 2}
                    onClick={() => setInversion(2)}>
                    {"2nd"}
                </Button>
            </ButtonGroup>
            <ButtonGroup>
                {Array.from(Array(13).keys()).map(function (x: number) {
                    return (
                        <Button
                            key={"fret-" + x}
                            variant={"outline-primary"}
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