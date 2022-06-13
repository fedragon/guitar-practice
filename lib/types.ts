export interface Position {
    gstring: number, // 1 = high E, 6 = low E
    fret: number,    // relative to startingFret
    strum?: boolean  // strum an open string?
}

export interface GroupOfNotes {
    name: string
    startingFret: number
    barre?: {
        fret: number,
        fromString: number,
        toString: number,
    }
    positions: Position[]
}
