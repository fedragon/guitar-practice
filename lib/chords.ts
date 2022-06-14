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

export function Place(
    chordName: string,
    chordNotes: string[],
    startFret: number,
    numFrets: number
): undefined | GroupOfNotes {
    let res = new Map<string, Position>()
        .set("E", {gstring: 0, fret: 0, strum: false})
        .set("A", {gstring: 1, fret: 0, strum: false})
        .set("D", {gstring: 2, fret: 0, strum: false})
        .set("G", {gstring: 3, fret: 0, strum: false})
        .set("B", {gstring: 4, fret: 0, strum: false})
        .set("e", {gstring: 5, fret: 0, strum: false})

    let ctx = {startFret, numFrets, stringOffset: 0, strings: lowToHigh}

    let rootIndex = findNote(chordNotes[0], ctx, res)

    if (rootIndex === -1) {
        console.log('root not found', chordNotes[0])

        return undefined
    }

    console.log('root note found at string', rootIndex)

    let found = true
    chordNotes.slice(1).forEach(note => {
        let noteIndex = findNote(note, {
            startFret,
            numFrets,
            stringOffset: rootIndex + 1,
            strings: lowToHigh.slice(rootIndex + 1)
        }, res)

        if (noteIndex === -1) {
            console.log('note not found', note)

            found = false
            return
        }

        console.log('note found at string', rootIndex)
    })

    if (!found) {
        return undefined
    }

    console.log('result', res)

    let it = res.values()
    let v = it.next()
    let positions = []
    while (!v.done) {
        let {gstring, fret, strum} = v.value
        if (startFret > 1 && fret > 0) {
            fret = fret - startFret + 1
        }
        positions.push({gstring: 6 - gstring, fret: fret, strum: strum ?? true})
        v = it.next()
    }

    return withBarre({name: chordName, startingFret: startFret, positions: positions})
}

export function findNote(note: string, context: Context, acc: Map<string, Position>): number {
    let stringIx = -1
    let {startFret, numFrets, stringOffset, strings} = context

    for (let ix = 0; ix < strings.length; ix++) {
        let s = strings[ix]
        let pos = s.notes.indexOf(note)

        if (acc.has(s.name)) {
            if (acc.get(s.name).strum ?? false) {
                console.log('already assigned, skipping', stringOffset + ix, note, s, acc.get(s.name))
                continue
            }
        }

        if (pos >= startFret && pos <= startFret + numFrets) {
            if (stringIx === -1) {
                stringIx = stringOffset + ix
            }
            acc.set(s.name, {gstring: stringOffset + ix, fret: pos, strum: true})
            console.log('findNote', note, 's', s, 'string.ix', ix, 'final.ix', (stringOffset + ix), 'pos', pos, 'max', startFret + numFrets, 'result', acc)
        }
    }

    return stringIx
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