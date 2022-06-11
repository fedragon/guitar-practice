export const AllChords = [
  {
    name: "A",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 0 },
      { gstring: 2, fret: 2 },
      { gstring: 3, fret: 2 },
      { gstring: 4, fret: 2 },
      { gstring: 5, fret: 0 },
      { gstring: 6, fret: 0, strum: false }
    ],
  }, {
    name: "Am",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 0 },
      { gstring: 2, fret: 1 },
      { gstring: 3, fret: 2 },
      { gstring: 4, fret: 2 },
      { gstring: 5, fret: 0 },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "B",
    startingFret: 2,
    barre: {
      fret: 2,
      fromString: 1,
      toString: 5,
    },
    strings: [
      { gstring: 2, fret: 3 },
      { gstring: 3, fret: 3 },
      { gstring: 4, fret: 3 },
      { gstring: 6, fret: 0, strum: false }
    ],
  }, {
    name: "Bm",
    startingFret: 2,
    barre: {
      fret: 2,
      fromString: 1,
      toString: 5,
    },
    strings: [
      { gstring: 2, fret: 2 },
      { gstring: 3, fret: 3 },
      { gstring: 4, fret: 3 },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "C",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 0 },
      { gstring: 2, fret: 1 },
      { gstring: 3, fret: 0 },
      { gstring: 4, fret: 2 },
      { gstring: 5, fret: 3 },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "Cm",
    startingFret: 3,
    barre: {
      fret: 3,
      fromString: 1,
      toString: 5,
    },
    strings: [
      { gstring: 2, fret: 2 },
      { gstring: 3, fret: 3 },
      { gstring: 4, fret: 3 },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "D",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 2 },
      { gstring: 2, fret: 3 },
      { gstring: 3, fret: 2 },
      { gstring: 4, fret: 0 },
      { gstring: 5, fret: 0, strum: false },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "Dm",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 1 },
      { gstring: 2, fret: 3 },
      { gstring: 3, fret: 2 },
      { gstring: 4, fret: 0 },
      { gstring: 5, fret: 0, strum: false },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "E",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 0 },
      { gstring: 2, fret: 0 },
      { gstring: 3, fret: 1 },
      { gstring: 4, fret: 2 },
      { gstring: 5, fret: 2 },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "Em",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 0 },
      { gstring: 2, fret: 0 },
      { gstring: 3, fret: 0 },
      { gstring: 4, fret: 2 },
      { gstring: 5, fret: 2 },
      { gstring: 6, fret: 0, strum: false }
    ],
  },
  {
    name: "F",
    startingFret: 1,
    barre: {
      fret: 1,
      fromString: 1,
      toString: 6,
    },
    strings: [
      { gstring: 3, fret: 2 },
      { gstring: 4, fret: 3 },
      { gstring: 5, fret: 3 },
    ],
  },
  {
    name: "Fm",
    startingFret: 1,
    barre: {
      fret: 1,
      fromString: 1,
      toString: 6,
    },
    strings: [
      { gstring: 4, fret: 3 },
      { gstring: 5, fret: 3 },
    ],
  },
  {
    name: "G",
    startingFret: 1,
    strings: [
      { gstring: 1, fret: 3 },
      { gstring: 2, fret: 0 },
      { gstring: 3, fret: 0 },
      { gstring: 4, fret: 0 },
      { gstring: 5, fret: 2 },
      { gstring: 6, fret: 3 }
    ],
  },
  {
    name: "Gm",
    startingFret: 3,
    barre: {
      fret: 3,
      fromString: 1,
      toString: 6,
    },
    strings: [
      { gstring: 4, fret: 3 },
      { gstring: 5, fret: 3 },
    ],
  },
]