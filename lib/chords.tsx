import { AllNotes } from "./notes"

export const AllChords: {
  name: string,
  root: string,
  type: string,
}[] = [
    { name: "A", root: "A", type: "major" },
    { name: "Am", root: "A", type: "minor" },
    { name: "B", root: "B", type: "major" },
    { name: "Bm", root: "B", type: "minor" },
    { name: "C", root: "C", type: "major" },
    { name: "Cm", root: "C", type: "minor" },
    { name: "D", root: "D", type: "major" },
    { name: "Dm", root: "D", type: "minor" },
    { name: "E", root: "E", type: "major" },
    { name: "Em", root: "E", type: "minor" },
    { name: "F", root: "F", type: "major" },
    { name: "Fm", root: "F", type: "minor" },
    { name: "G", root: "G", type: "major" },
    { name: "Gm", root: "G", type: "minor" },
  ]

const notes = AllNotes.map(n => n.name)
const strings = [
  notesFor("E"),
  notesFor("B"),
  notesFor("G"),
  notesFor("D"),
  notesFor("A"),
  notesFor("E"),
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

export function Place(chord: string[], startFret: number, numFrets: number) {
  let res = new Map<number, { gstring: number, fret: number, strum?: boolean }>()
  let positions = []

  let assignRoot = function (root: string, xs: string[][]) {
    for (let ix = 0; ix < xs.length; ix++) {
      let s = xs[ix]
      let pos = s.indexOf(root)

      if (pos <= startFret + numFrets) {
        return { gstring: 6 - ix, fret: pos }
      }
    }

    return {}
  }

  let root = assignRoot(chord[0], strings.slice().reverse())
  console.log('root.gstring', root.gstring)

  if (root.gstring !== undefined) {
    strings.slice(0, root.gstring - 1).forEach((s, ix) => {
      res.set(ix + 1, { gstring: ix + 1, fret: 0, strum: false })
    })
    res.set(root.gstring, { gstring: root.gstring, fret: root.fret })

    strings.slice(0, root.gstring - 1).forEach((s, ix) => {
      let gstring = ix + 1

      for (let j = 0; j < chord.length; j++) {
        let note = chord[j]
        let pos = s.indexOf(note)

        console.log('string', s, 'note', note, 'pos', pos)

        if (pos <= startFret + numFrets) {
          res.set(gstring, { gstring: gstring, fret: pos })
          break
        }
      }
    })

    console.log('result', res)

    let it = res.values()
    let v = it.next()
    while (!v.done) {
      positions.push(v.value)
      v = it.next()
    }
  }


  return positions
}