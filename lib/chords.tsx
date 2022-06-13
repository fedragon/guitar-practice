import { AllNotes } from "./notes"

export interface ChordSpec {
  name: string
  startingFret: number
  root: string
  type: string
}

export interface Chord {
  name: string
  startingFret: number
  positions: {
    gstring: number
    fret: number
    strum?: boolean
  }[]
}

export const AllChords: ChordSpec[] = [
  { name: "A", startingFret: 0, root: "A", type: "major" },
  { name: "Am", startingFret: 0, root: "A", type: "minor" },
  { name: "B", startingFret: 2, root: "B", type: "major" },
  { name: "Bm", startingFret: 2, root: "B", type: "minor" },
  { name: "C", startingFret: 0, root: "C", type: "major" },
  { name: "Cm", startingFret: 3, root: "C", type: "minor" },
  { name: "D", startingFret: 0, root: "D", type: "major" },
  { name: "Dm", startingFret: 0, root: "D", type: "minor" },
  { name: "E", startingFret: 0, root: "E", type: "major" },
  { name: "Em", startingFret: 0, root: "E", type: "minor" },
  { name: "F", startingFret: 1, root: "F", type: "major" },
  { name: "Fm", startingFret: 1, root: "F", type: "minor" },
  { name: "G", startingFret: 0, root: "G", type: "major" },
  { name: "Gm", startingFret: 3, root: "G", type: "minor" },
]

const notes = AllNotes.map(n => n.name)
const lowToHigh = [
  { name: "E", notes: notesFor("E") },
  { name: "A", notes: notesFor("A") },
  { name: "D", notes: notesFor("D") },
  { name: "G", notes: notesFor("G") },
  { name: "B", notes: notesFor("B") },
  { name: "e", notes: notesFor("E") },
]

function notesFor(note: string) {
  let ix = notes.indexOf(note)

  if (ix === undefined) {
    return []
  }

  if (ix == 0) {
    return notes
  }

  return notes.slice(ix).concat(notes.slice(0, ix))
}

function wrap(start: number, offset: number) {
  if (start + offset > 11) {
    return (start + offset) % 12
  }

  return start + offset
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

export function Place(
  chordName: string,
  chordNotes: string[],
  startFret: number,
  numFrets: number
): Chord {
  let res = new Map()
    .set("E", { gstring: 0, fret: 0, strum: false })
    .set("A", { gstring: 1, fret: 0, strum: false })
    .set("D", { gstring: 2, fret: 0, strum: false })
    .set("G", { gstring: 3, fret: 0, strum: false })
    .set("B", { gstring: 4, fret: 0, strum: false })
    .set("e", { gstring: 5, fret: 0, strum: false })

  console.log('chord notes', chordNotes)

  let findNote = function (note: string, startingFret: number, offsetIx: number, strings: { name: string, notes: string[] }[]): number {
    let stringIx = -1
    for (let ix = 0; ix < strings.length; ix++) {
      let s = strings[ix]
      let pos = s.notes.indexOf(note)

      if (res.has(s.name)) {
        if (res.get(s.name).strum ?? false) {
          console.log('already assigned, skipping', offsetIx + ix, note, s, res.get(offsetIx + ix))
          continue
        }
      }

      if (pos >= startingFret && pos <= startingFret + numFrets) {
        if (stringIx == -1) {
          stringIx = offsetIx + ix
        }
        res.set(s.name, { gstring: offsetIx + ix, fret: pos, strum: true })
        console.log('findNote', note, 's', s, 'string.ix', ix, 'final.ix', (offsetIx + ix), 'pos', pos, 'result', res)
      }
    }

    return stringIx
  }

  let rootIndex = findNote(chordNotes[0], startFret, 0, lowToHigh)
  console.log('root.gstring', rootIndex)

  if (rootIndex == -1) {
    console.log('root not found', chordNotes[0])
    return Place(chordName, chordNotes, startFret + 1, numFrets)
  }

  chordNotes.slice(1).forEach(note => {
    let noteIndex = findNote(note, startFret, rootIndex + 1, lowToHigh.slice(rootIndex + 1))

    if (noteIndex == -1) {
      console.log('note not found', note)
      return Place(chordName, chordNotes, startFret + 1, numFrets)
    }
  })

  console.log('result', res)

  let it = res.values()
  let v = it.next()
  let positions = []
  while (!v.done) {
    let { gstring, fret, strum } = v.value
    if (startFret > 1) {
      fret = fret - startFret + 1
    }
    positions.push({ gstring: 6 - gstring, fret: fret, strum: strum ?? true })
    v = it.next()
  }

  return { name: chordName, startingFret: startFret, positions: positions }
}