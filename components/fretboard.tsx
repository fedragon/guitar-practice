export default function Guitar({
  config,
  chord
}: {
  config: {
    base: number, // base value (in pixel) used to keep fretboard proportional
  },
  chord: {
    name: string,
    startingFret: number,
    strings: {
      gstring: number, // 1 = high E, 6 = low E
      fret: number,    // relative to startingFret
      strum?: boolean  // strum an open string?
    }[]
  }
}) {
  let base = config.base
  let off = base * 1.3
  let width = base * 8
  let height = base * 5
  let chordNameFontSize = base / 2
  let startingFretFontSize = base / 3

  return (
    <svg xmlns={"http://www.w3.org/2000/svg"} width={off * 2 + width} height={off * 2 + height}>
      {/* nut */}
      <line x1={off} y1={off} x2={off} y2={off + height} stroke={"black"} strokeWidth={10} />

      {/* frets */}
      <line x1={off + width / 4} y1={off} x2={off + width / 4} y2={off + height} stroke={"black"} strokeWidth={2} />
      <line x1={off + width / 2} y1={off} x2={off + width / 2} y2={off + height} stroke={"black"} strokeWidth={2} />
      <line x1={off + width / 4 * 3} y1={off} x2={off + width / 4 * 3} y2={off + height} stroke={"black"} strokeWidth={2} />
      <line x1={off + width} y1={off} x2={off + width} y2={off + height} stroke={"black"} strokeWidth={2} />

      {chord.startingFret > 1 &&
        <text
          x={off + base - 10}
          y={off / 2}
          fontSize={startingFretFontSize}
          stroke={"black"}>
          {chord.startingFret}fr
        </text>}

      {/* strings */}
      <line x1={off} y1={off} x2={off + width} y2={off} stroke={"black"} strokeWidth={2} />
      <line x1={off} y1={off + base} x2={off + width} y2={off + base} stroke={"black"} strokeWidth={2} />
      <line x1={off} y1={off + base * 2} x2={off + width} y2={off + base * 2} stroke={"black"} strokeWidth={2} />
      <line x1={off} y1={off + base * 3} x2={off + width} y2={off + base * 3} stroke={"black"} strokeWidth={2} />
      <line x1={off} y1={off + base * 4} x2={off + width} y2={off + base * 4} stroke={"black"} strokeWidth={2} />
      <line x1={off} y1={off + height} x2={off + width} y2={off + height} stroke={"black"} strokeWidth={2} />

      {/* chord name */}
      <text x={off / 2 + width / 2} y={off / 2} fontSize={chordNameFontSize} stroke={"black"} fill={"black"}>{chord.name}</text>

      {chord.strings.map(function (row: { gstring: number, fret: number, strum?: boolean }) {
        let gstring = row.gstring - 1

        if (row.strum ?? true) {
          let cx = off / 3
          let cy = off + base * gstring
          let radius = base / 3
          let fill = "green"

          if (row.fret == 0) {
            fill = "white"
            radius = base / 4
          } else if (row.fret == 1) {
            cx = off + base
          } else if (row.fret > 1) {
            cx = off + base * (row.fret + 1) + base * (row.fret - 2)
          }

          return (<circle cx={cx} cy={cy} r={radius} stroke={"black"} strokeWidth={2} fill={fill} />)
        } else {
          let x = base / 2
          let y1 = off * 1.15 + base * gstring
          let y2 = off * 0.75 + base * gstring
          let moff = base / 5

          return (
            [
              <line x1={moff} y1={y1} x2={x + moff} y2={y2} stroke={"black"} strokeWidth={2} />,
              <line x1={x + moff} y1={y1} x2={moff} y2={y2} stroke={"black"} strokeWidth={2} />
            ]
          )
        }
      })}
    </svg>
  )
}
