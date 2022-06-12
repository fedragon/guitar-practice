export default function Fretboard({
  config,
  notes,
}: {
  config: {
    fretWidth: number,    // width of each fret, in pixels
    fretsNumber?: number, // number of frets to draw
  },
  notes?: {
    name: string,
    startingFret?: number,
    barre?: {
      fret: number,
      fromString: number,
      toString: number,
    },
    positions: {
      gstring: number, // 1 = high E, 6 = low E
      fret: number,    // relative to startingFret
      strum?: boolean  // strum an open string?
    }[]
  },
}) {
  let base = config.fretWidth / 2
  let numFrets = config.fretsNumber ?? 4

  let offset = base
  let width = base * 8
  let height = base * 5

  return (
    <svg key={"fretboard"} xmlns={"http://www.w3.org/2000/svg"} width={offset * 2 + width} height={offset * 2 + height}>
      <line
        key={"fretboard-nut"}
        x1={offset}
        y1={offset - 1}
        x2={offset}
        y2={offset + height + 1}
        stroke={"black"}
        strokeWidth={5} />

      {drawFrets(numFrets, offset, width, height)}

      {drawStrings(offset, base, width)}

      {notes && placeNotes(numFrets, notes, offset, base, width)}
    </svg>
  )
}

function drawFrets(frets: number, offset: number, width: number, height: number) {
  let content = []

  for (let index = 1; index < frets + 1; index++) {
    let x = offset + width / frets * index

    content.push(
      <line
        key={"fret-" + index}
        x1={x}
        y1={offset}
        x2={x}
        y2={offset + height}
        stroke={"black"}
        strokeWidth={2} />
    )
  }

  return content
}

function drawStrings(off: number, base: number, width: number) {
  let content = []
  for (let index = 0; index < 6; index++) {
    content.push(
      <line
        key={"fretboard-string-" + index}
        x1={off}
        y1={off + base * index}
        x2={off + width}
        y2={off + base * index}
        stroke={"black"}
        strokeWidth={2}
      />
    )
  }

  return content
}

function placeNotes(
  numFrets: number,
  notes: {
    name: string,
    startingFret?: number,
    barre?: {
      fret: number,
      fromString: number,
      toString: number,
    },
    positions: {
      gstring: number,
      fret: number,
      strum?: boolean
    }[]
  },
  offset: number,
  base: number,
  width: number,
) {
  let content = []

  content.push(
    <text
      key={"notes-name"}
      x={offset / 2 + width / 2}
      y={offset / 2}
      fontSize={base /2 }
      stroke={"black"}
      fill={"black"}>
      {notes.name}
    </text>
  )

  if (notes.startingFret ?? 1 > 1) {
    content.push(
      <text
        key={"notes-startfret"}
        x={offset}
        y={offset / 2}
        fontSize={base / 3}
        stroke={"black"}>
        {notes.startingFret}fr
      </text>
    )
  }

  if (notes.barre) {
    let w = width / numFrets / 2
    let height = (base * notes.barre.toString - base * notes.barre.fromString) * 1.125

    content.push(
      <rect
        key={"notes-barre"}
        x={offset + w / 2}
        y={base * notes.barre.fromString - 10}
        width={w}
        height={height}
        rx={15}
        ry={15}
        stroke={"black"}
        strokeWidth={2}
        fill={"green"} />
    )
  }

  return content.concat(
    notes.positions.map(
      function (row: { gstring: number, fret: number, strum?: boolean }) {
        let gstring = row.gstring - 1
        let x = width / numFrets

        if (row.strum ?? true) {
          let cx = offset / 2
          let cy = offset + base * gstring
          let radius = x * 0.2
          let fill = "green"

          if (row.fret == 0) {
            fill = "white"
            radius = base * 0.15
          } else if (row.fret == 1) {
            cx = offset + width / numFrets / 2
          } else if (row.fret > 1) {
            let a = x * row.fret
            cx = offset + a - x / 2
          }

          return (
            <circle
              key={"notes-dot-cx" + cx + "cy" + cy}
              cx={cx}
              cy={cy}
              r={radius}
              stroke={"black"}
              strokeWidth={2}
              fill={fill} />
          )
        } else {
          let x1 = offset - offset / 3 * 2
          let x2 = x1 + offset / 3
          let y1 = offset * 1.15 + base * gstring
          let y2 = offset * 0.75 + base * gstring

          return (
            [
              <line
                key={"notes-x-line-1"}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={"black"}
                strokeWidth={2}
              />,
              <line
                key={"notes-x-line-2"}
                x1={x2}
                y1={y1}
                x2={x1}
                y2={y2}
                stroke={"black"}
                strokeWidth={2}
              />
            ]
          )
        }
      }
    )
  )
}