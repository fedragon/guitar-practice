import {positionsOf} from "./notes"

const B = {
    name: "B",
    positions: [
        {gstring: 1, fret: 6},
        {gstring: 2, fret: 11},
        {gstring: 3, fret: 3},
        {gstring: 4, fret: 8},
        {gstring: 5, fret: 1},
        {gstring: 6, fret: 6},
    ]
}

describe("Position of notes", () => {
    test("should wrap after the 12th fret", () => {
        expect(positionsOf("B", 1)).toEqual(B)
    })
})