import {Position} from "./types";

const A = {
    name: "A",
    positions: [
        {gstring: 1, fret: 5},
        {gstring: 2, fret: 10},
        {gstring: 3, fret: 2},
        {gstring: 4, fret: 7},
        {gstring: 5, fret: 12},
        {gstring: 6, fret: 5},
    ]
}

export const AllNotes = [A].concat(
    ["A#", "B", "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#"].map(
        (name: string, index: number) => positionsOf(name, index + 1)
    )
)

export function positionsOf(name: string, offset: number): { name: string, positions: Position[] } {
    return {
        name: name,
        positions: A.positions.map(function (row: { gstring: number, fret: number }) {
            let x = row.fret + offset
            return {gstring: row.gstring, fret: (x == 12) ? x : x % 12}
        })
    }
}