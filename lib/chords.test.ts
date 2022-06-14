import {findNote, lowToHigh, Place} from "./chords";
import {Position} from "./types";

describe("Notes are assigned to their respective positions on each string", () => {
    test("A", () => {
        let res = new Map<string, Position>()
        let stringIndex = findNote("A", {startFret: 0, numFrets: 12, stringOffset: 0, strings: lowToHigh}, res);

        expect(stringIndex).toBe(0)
        expect(res.get("E")).toStrictEqual({gstring: 0, fret: 5, strum: true})
        expect(res.get("A")).toStrictEqual({gstring: 1, fret: 0, strum: true})
        expect(res.get("D")).toStrictEqual({gstring: 2, fret: 7, strum: true})
        expect(res.get("G")).toStrictEqual({gstring: 3, fret: 2, strum: true})
        expect(res.get("B")).toStrictEqual({gstring: 4, fret: 10, strum: true})
        expect(res.get("e")).toStrictEqual({gstring: 5, fret: 5, strum: true})
    })

    test("C", () => {
        let res = new Map<string, Position>()
        let stringIndex = findNote("C", {startFret: 0, numFrets: 12, stringOffset: 0, strings: lowToHigh}, res);

        expect(stringIndex).toBe(0)
        expect(res.get("E")).toStrictEqual({gstring: 0, fret: 8, strum: true})
        expect(res.get("A")).toStrictEqual({gstring: 1, fret: 3, strum: true})
        expect(res.get("D")).toStrictEqual({gstring: 2, fret: 10, strum: true})
        expect(res.get("G")).toStrictEqual({gstring: 3, fret: 5, strum: true})
        expect(res.get("B")).toStrictEqual({gstring: 4, fret: 1, strum: true})
        expect(res.get("e")).toStrictEqual({gstring: 5, fret: 8, strum: true})
    })

    test("E", () => {
        let res = new Map<string, Position>()
        let stringIndex = findNote("E", {startFret: 0, numFrets: 12, stringOffset: 0, strings: lowToHigh}, res);

        expect(stringIndex).toBe(0)
        expect(res.get("E")).toStrictEqual({gstring: 0, fret: 0, strum: true})
        expect(res.get("A")).toStrictEqual({gstring: 1, fret: 7, strum: true})
        expect(res.get("D")).toStrictEqual({gstring: 2, fret: 2, strum: true})
        expect(res.get("G")).toStrictEqual({gstring: 3, fret: 9, strum: true})
        expect(res.get("B")).toStrictEqual({gstring: 4, fret: 5, strum: true})
        expect(res.get("e")).toStrictEqual({gstring: 5, fret: 0, strum: true})
    })

    test("G#", () => {
        let res = new Map<string, Position>()
        let stringIndex = findNote("G#", {startFret: 0, numFrets: 12, stringOffset: 0, strings: lowToHigh}, res);

        expect(stringIndex).toBe(0)
        expect(res.get("E")).toStrictEqual({gstring: 0, fret: 4, strum: true})
        expect(res.get("A")).toStrictEqual({gstring: 1, fret: 11, strum: true})
        expect(res.get("D")).toStrictEqual({gstring: 2, fret: 6, strum: true})
        expect(res.get("G")).toStrictEqual({gstring: 3, fret: 1, strum: true})
        expect(res.get("B")).toStrictEqual({gstring: 4, fret: 9, strum: true})
        expect(res.get("e")).toStrictEqual({gstring: 5, fret: 4, strum: true})
    })
})

describe("Placing a chord", () => {
    test("Returns undefined when not all notes are placed", () => {
        expect(Place("C", ["C", "E", "G"], 4, 3)).toBeUndefined()
    })

    test("returns a set of placements when all notes are placed", () => {
        let expected = {
            "name": "C",
            "startingFret": 3,
            "positions": [
                {"fret": 0, "gstring": 6, "strum": false},
                {"fret": 1, "gstring": 5, "strum": true},
                {"fret": 3, "gstring": 4, "strum": true},
                {"fret": 3, "gstring": 3, "strum": true},
                {"fret": 3, "gstring": 2, "strum": true},
                {"fret": 1, "gstring": 1, "strum": true}
            ],
        }
        expect(Place("C", ["C", "E", "G"], 3, 3)).toStrictEqual(expected)
    })
})