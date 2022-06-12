export default function Fretboard({
  config,
  chord
}: {
  config: {
    base: number,  // base value (in pixel) used to keep fretboard proportional
    frets?: number, // number of frets to draw
  },
  chord: {
    name: string,
    startingFret: number,
    barre?: {
      fret: number,
      fromString: number,
      toString: number,
    },
    strings: {
      gstring: number, // 1 = high E, 6 = low E
      fret: number,    // relative to startingFret
      strum?: boolean  // strum an open string?
    }[]
  }
}) {
  let base = config.base
  let numFrets = config.frets ?? 4

  let offset = base * 1.25
  let width = base * 8
  let height = base * 5

  return (
    <svg key={"fretboard"} xmlns={"http://www.w3.org/2000/svg"} width={offset * 2 + width} height={offset * 2 + height}>
      <line
        key={"fretboard-nut"}
        x1={offset}
        y1={offset}
        x2={offset}
        y2={offset + height}
        stroke={"black"}
        strokeWidth={10} />

      {drawFrets(numFrets, offset, width, height)}

      {drawStrings(offset, base, width)}

      {drawChord(numFrets, chord, offset, base, width)}
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

function drawChord(
  numFrets: number,
  chord: {
    name: string,
    startingFret: number,
    barre?: {
      fret: number,
      fromString: number,
      toString: number,
    },
    strings: {
      gstring: number,
      fret: number,
      strum?: boolean
    }[]
  },
  offset: number,
  base: number,
  width: number,
) {
  let chordNameFontSize = base / 2
  let startingFretFontSize = base / 3
  let content = []

  content.push(
    <text
      key={"chord-name"}
      x={offset / 2 + width / 2}
      y={offset / 2}
      fontSize={chordNameFontSize}
      stroke={"black"}
      fill={"black"}>
      {chord.name}
    </text>
  )

  if (chord.startingFret > 1) {
    content.push(
      <text
        key={"chord-startfret"}
        x={offset + base - 10}
        y={offset / 2}
        fontSize={startingFretFontSize}
        stroke={"black"}>
        {chord.startingFret}fr
      </text>
    )
  }

  if (chord.barre) {
    content.push(
      <rect
        key={"chord-barre"}
        x={offset + base / 1.5}
        y={base * chord.barre.fromString}
        width={base / 1.5}
        height={(base * chord.barre.toString - base * chord.barre.fromString) * 1.125}
        rx={15}
        ry={15}
        stroke={"black"}
        strokeWidth={2}
        fill={"green"} />
    )
  }

  return content.concat(
    chord.strings.map(
      function (row: { gstring: number, fret: number, strum?: boolean }) {
        let gstring = row.gstring - 1

        if (row.strum ?? true) {
          let cx = offset / (numFrets - 1)
          let cy = offset + base * gstring
          let radius = base / (numFrets - 1)
          let fill = "green"

          if (row.fret == 0) {
            fill = "white"
            radius = base / numFrets
          } else if (row.fret == 1) {
            cx = offset + base
          } else if (row.fret > 1) {
            cx = offset + base * (row.fret * 1.6)
          }

          return (
            <circle
              key={"chord-dot-cx" + cx + "cy" + cy}
              cx={cx}
              cy={cy}
              r={radius}
              stroke={"black"}
              strokeWidth={2}
              fill={fill} />
          )
        } else {
          let x = base / (numFrets / 2)
          let y1 = offset * 1.15 + base * gstring
          let y2 = offset * 0.75 + base * gstring
          let moff = base / (numFrets + 1)

          return (
            [
              <line
                key={"chord-x-line-1"}
                x1={moff}
                y1={y1}
                x2={x + moff}
                y2={y2}
                stroke={"black"}
                strokeWidth={2}
              />,
              <line
                key={"chord-x-line-2"}
                x1={x + moff}
                y1={y1}
                x2={moff}
                y2={y2}
                stroke={"black"}
                strokeWidth={2}
              />
            ]
          )
        }
      }))
}