import {Place} from "./chords";

describe("Placing a chord", () => {
    test("Returns undefined when not all notes are placed", () => {
        expect(Place("C", ["C", "E", "G"], 4, 3)).toBeUndefined()
    })

    test("returns a set of placements when all notes are placed", () => {
        let expected = {
            "name": "C",
            "startingFret": 3,
            "positions": [
                {"gstring": 6, "fret": 0, "strum": false},
                {"gstring": 5, "fret": 1, "strum": true},
                {"gstring": 4, "fret": 3, "strum": true},
                {"gstring": 3, "fret": 3, "strum": true},
                {"gstring": 2, "fret": 3, "strum": true},
                {"gstring": 1, "fret": 1, "strum": true}
            ],
        }
        expect(Place("C", ["C", "E", "G"], 3, 3)).toStrictEqual(expected)
    })
})

describe("Notes are placed according to the R5R35R form, when possible", () => {
    test("A", () => {
        let result = Place("A", ["A", "C#", "E"], 0, 3)
        let expected = {
            "name": "A",
            "startingFret": 0,
            "positions": [
                {"gstring": 6, "fret": 0, "strum": false},
                {"gstring": 5, "fret": 0, "strum": true},
                {"gstring": 4, "fret": 2, "strum": true},
                {"gstring": 3, "fret": 2, "strum": true},
                {"gstring": 2, "fret": 2, "strum": true},
                {"gstring": 1, "fret": 0, "strum": true},
            ],
        }
        expect(result).toStrictEqual(expected)
    })

    test("D", () => {
        let result = Place("D", ["D", "F#", "A"], 0, 3)
        let expected = {
            "name": "D",
            "startingFret": 0,
            "positions": [
                {"gstring": 6, "fret": 0, "strum": false},
                {"gstring": 5, "fret": 0, "strum": false},
                {"gstring": 4, "fret": 0, "strum": true},
                {"gstring": 3, "fret": 2, "strum": true},
                {"gstring": 2, "fret": 3, "strum": true},
                {"gstring": 1, "fret": 2, "strum": true},
            ],
        }
        expect(result).toStrictEqual(expected)
    })

    test("F", () => {
        let result = Place("F", ["F", "A", "C"], 0, 3)
        let expected = {
            "name": "F",
            "startingFret": 0,
            "positions": [
                {"gstring": 6, "fret": 1, "strum": true},
                {"gstring": 5, "fret": 3, "strum": true},
                {"gstring": 4, "fret": 3, "strum": true},
                {"gstring": 3, "fret": 2, "strum": true},
                {"gstring": 2, "fret": 1, "strum": true},
                {"gstring": 1, "fret": 1, "strum": true},
            ],
        }
        expect(result).toStrictEqual(expected)
    })

    test("G", () => {
        let result = Place("G", ["G", "B", "D"], 0, 3)
        let expected = {
            "name": "G",
            "startingFret": 0,
            "positions": [
                {"gstring": 6, "fret": 3, "strum": true},
                {"gstring": 5, "fret": 2, "strum": true},
                {"gstring": 4, "fret": 0, "strum": true},
                {"gstring": 3, "fret": 0, "strum": true},
                {"gstring": 2, "fret": 0, "strum": true},
                {"gstring": 1, "fret": 3, "strum": true},
            ],
        }
        expect(result).toStrictEqual(expected)
    })
})