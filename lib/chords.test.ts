import {findNote, lowToHigh} from "./chords";
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