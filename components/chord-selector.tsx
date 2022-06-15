import {useEffect, useState} from 'react'
import {Button, ButtonGroup, Stack} from 'react-bootstrap'
import {AllPlacements, Major, Minor, Place} from '../lib/chords'
import Fretboard from '../components/fretboard'
import {AllNotes} from "../lib/notes";
import {GroupOfNotes} from "../lib/types";

export function ChordSelector() {
    const [root, setRoot] = useState("A")
    const [type, setType] = useState("major")
    const [fret, setFret] = useState(0)
    const [inversion, setInversion] = useState(0)
    const [placements, setPlacements] = useState<{ fret: number, notes: GroupOfNotes }[]>([])
    const [chord, setChord] = useState(Place(root, Major("A"), fret, 3))

    useEffect(() => {
        let notes: string[]
        let name: string

        if (type === 'major') {
            notes = Major(root)
        } else if (type === "minor") {
            notes = Minor(root)
        }

        let suffix = type === "major" ? "" : "m"

        switch (inversion) {
            case 0:
                name = notes[0] + suffix
                break
            case 1:
                name = notes[0] + suffix + "/" + notes[1]
                notes = notes.slice(1).concat(notes.slice(0, 1))
                break
            case 2:
                name = notes[0] + suffix + "/" + notes[2]
                notes = notes.slice(2).concat(notes.slice(0, 2))
                break
        }

        console.log('chord notes', notes)
        setPlacements(AllPlacements(name, notes, 0, 3))
        setFret(0)
    }, [root, type, inversion])

    useEffect(() => {
        let ch = placements.find(p => p.fret === fret)

        if (ch !== undefined) {
            setChord(ch.notes)
        }
    }, )

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
            {/*<ButtonGroup>*/}
            {/*    <Button*/}
            {/*        key={"inversion-root"}*/}
            {/*        variant={"outline-primary"}*/}
            {/*        size={"sm"}*/}
            {/*        active={inversion === 0}*/}
            {/*        onClick={() => setInversion(0)}>*/}
            {/*        {"root"}*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        key={"inversion-1st"}*/}
            {/*        variant={"outline-primary"}*/}
            {/*        size={"sm"}*/}
            {/*        active={inversion === 1}*/}
            {/*        onClick={() => setInversion(1)}>*/}
            {/*        {"1st"}*/}
            {/*    </Button>*/}
            {/*    <Button*/}
            {/*        key={"inversion-2nd"}*/}
            {/*        variant={"outline-primary"}*/}
            {/*        size={"sm"}*/}
            {/*        active={inversion === 2}*/}
            {/*        onClick={() => setInversion(2)}>*/}
            {/*        {"2nd"}*/}
            {/*    </Button>*/}
            {/*</ButtonGroup>*/}
            <ButtonGroup>
                {placements.map(p => p.fret).map(function (x: number) {
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