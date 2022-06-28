import {AllNotes} from "./notes"
import {GroupOfNotes, Position} from "./types";

const notes = AllNotes.map(n => n.name)
export const lowToHigh = [
    {name: "E", notes: notesFor("E")},
    {name: "A", notes: notesFor("A")},
    {name: "D", notes: notesFor("D")},
    {name: "G", notes: notesFor("G")},
    {name: "B", notes: notesFor("B")},
    {name: "e", notes: notesFor("E")},
]

function notesFor(note: string) {
    let ix = notes.indexOf(note)

    if (ix === undefined) {
        return []
    }

    if (ix === 0) {
        return notes
    }

    return notes.slice(ix).concat(notes.slice(0, ix))
}

function wrap(start: number, offset: number) {
    return (start + offset) % 12
}

export function Major(name: string) {
    let root = notes.indexOf(name)
    let major3rd = wrap(root, 4)
    let minor3rd = wrap(major3rd, 3)

    return [root, major3rd, minor3rd].map(ix => notes[ix])
}

export function Minor(name: string) {
    let root = notes.indexOf(name)
    let minor3rd = wrap(root, 3)
    let major3rd = wrap(minor3rd, 4)

    return [root, minor3rd, major3rd].map(ix => notes[ix])
}

interface Context {
    startFret: number
    numFrets: number
    stringOffset: number
    strings: { name: string, notes: string[] }[]
    canSkipString?: boolean
}

export function AllPlacements(
    chordName: string,
    chordNotes: string[],
    startFret: number,
    numFrets: number
): { fret: number, notes: GroupOfNotes }[] {
    let res = []

    for (let fret = startFret; fret + numFrets <= 12; fret++) {
        let chord = Place(chordName, chordNotes, fret, numFrets)

        if (chord !== undefined) {
            res.push({fret, notes: chord})
        }
    }

    return res
}

function withBarre(chord: GroupOfNotes): GroupOfNotes {
    let byFret = new Map<number, number[]>()
    let minFret = 99
    chord.positions.forEach(p => {
        if (p.fret > 0 && p.strum) {
            let existing = byFret.get(p.fret)

            if (p.fret < minFret) {
                minFret = p.fret
            }

            if (existing === undefined) {
                byFret.set(p.fret, [p.gstring])
            } else {
                existing.push(p.gstring)
            }
        }
    })

    console.log('byFret', byFret, 'minFret', minFret)

    let barrePositions = byFret.get(minFret)
    if (barrePositions.length > 1 && minFret - chord.startingFret === 1 && byFret.size > 1) {
        barrePositions.sort()

        let positions = []
        chord.positions.forEach(p => {
            if (p.fret != minFret) {
                positions.push(p)
            }
        })

        chord.positions = positions
        chord.barre = {
            fret: minFret,
            fromString: barrePositions[0],
            toString: barrePositions[barrePositions.length - 1],
        }
    }

    return chord
}

interface ChordForm {
    name: string
    notes: { name: string, required: boolean }[]
}

// E, A, D forms
function r5r35r(name: string, notes: string[]): ChordForm {
    let [root, third, fifth] = notes

    return {
        name: "R-5-R-3-(5)-(R)",
        notes: [
            {name: root, required: true},
            {name: fifth, required: true},
            {name: root, required: true},
            {name: third, required: true},
            {name: fifth, required: false},
            {name: root, required: false},
        ]
    }
}

// C, G forms
function r35r3r(name: string, notes: string[]): ChordForm {
    let [root, third, fifth] = notes

    return {
        name: "R-3-5-(R)-(3)-(R)",
        notes: [
            {name: root, required: true},
            {name: third, required: true},
            {name: fifth, required: true},
            {name: root, required: false},
            {name: third, required: false},
            {name: root, required: false},
        ]
    }
}

function place(chordName: string, chordNotes: string[], startFret: number, numFrets: number, form: ChordForm) {
    let res = new Map<string, Position>()
        .set("E", {gstring: 0, fret: 0, note: "E", strum: false})
        .set("A", {gstring: 1, fret: 0, note: "A", strum: false})
        .set("D", {gstring: 2, fret: 0, note: "D", strum: false})
        .set("G", {gstring: 3, fret: 0, note: "G", strum: false})
        .set("B", {gstring: 4, fret: 0, note: "B", strum: false})
        .set("e", {gstring: 5, fret: 0, note: "E", strum: false})
    let allFound = true
    let offset = 0
    let ctx = {startFret, numFrets, stringOffset: offset, strings: lowToHigh, canSkipString: true}

    console.log('attempting to place chord', chordName, 'form', form)

    form.notes.forEach(note => {
        let placement = findNote(note.name, ctx)

        if (placement === undefined) {
            console.log('note NOT found', note, 'required', note.required, 'stringOffset', offset)

            if (note.required) {
                allFound = false
                return
            }
        } else {
            console.log('note found', note, 'at', placement)
            res.set(placement.stringName, placement.position)
            ctx.stringOffset = placement.position.gstring + 1
            ctx.strings = lowToHigh.slice(placement.position.gstring + 1)
            ctx.canSkipString = false
        }
    })

    if (!allFound) {
        return undefined
    }

    let it = res.values()
    let v = it.next()
    let positions = []
    while (!v.done) {
        let {gstring, fret, note, strum} = v.value
        if (startFret > 1 && fret > 0) {
            fret = fret - startFret + 1
        }
        positions.push({gstring: 6 - gstring, fret: fret, note: note, strum: strum ?? true})
        v = it.next()
    }

    return {name: chordName, startingFret: startFret, positions: positions}
}

export function Place(
    chordName: string,
    chordNotes: string[],
    startFret: number,
    numFrets: number
): undefined | GroupOfNotes {
    let notes = place(chordName, chordNotes, startFret, numFrets, r5r35r(chordName, chordNotes))
    if (notes === undefined) {
        notes = place(chordName, chordNotes, startFret, numFrets, r35r3r(chordName, chordNotes))
    }

    return notes
}

export function findNote(
    note: string,
    context: Context
): undefined | {
    stringName: string,
    position: Position
} {
    let {startFret, numFrets, stringOffset, strings, canSkipString} = context
    if (canSkipString) {
        for (let ix = 0; ix < strings.length; ix++) {
            let s = strings[ix]
            let pos = s.notes.indexOf(note)

            if (pos >= startFret && pos <= startFret + numFrets) {
                return {stringName: s.name, position: {gstring: stringOffset + ix, fret: pos, note: note, strum: true}}
            }
        }
    } else {
        if (strings.length > 0) {
            let pos = strings[0].notes.indexOf(note)

            if (pos >= startFret && pos <= startFret + numFrets) {
                return {stringName: strings[0].name, position: {gstring: stringOffset, fret: pos, note: note, strum: true}}
            }
        }
    }

    return undefined
}