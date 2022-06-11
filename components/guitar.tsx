export default function Guitar({
  chord
}: {
  chord: {
    name: string,
    startingFret: number,
    strings: {
      gstring: number,
      fret: number,
      strum?: boolean
    }[]
  }
}) {
  let base = 75
  let xoff = base + 25
  let yoff = xoff
  let width = base * 8
  let height = base * 5

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 700" >
      {/* nut */}
      <line x1={xoff} y1={yoff} x2={xoff} y2={yoff + height} stroke={"black"} strokeWidth={10} />

      {/* frets */}
      <line x1={xoff + width / 4} y1={yoff} x2={xoff + width / 4} y2={yoff + height} stroke={"black"} strokeWidth={2} />
      <line x1={xoff + width / 2} y1={yoff} x2={xoff + width / 2} y2={yoff + height} stroke={"black"} strokeWidth={2} />
      <line x1={xoff + width / 4 * 3} y1={yoff} x2={xoff + width / 4 * 3} y2={yoff + height} stroke={"black"} strokeWidth={2} />
      <line x1={xoff + width} y1={yoff} x2={xoff + width} y2={yoff + height} stroke={"black"} strokeWidth={2} />

      {chord.startingFret > 1 && <text x={xoff + base - 10} y={xoff / 2} fontSize={18} stroke={"black"}>{chord.startingFret}fr</text>}

      {/* strings */}
      <line x1={xoff} y1={yoff} x2={xoff + width} y2={yoff} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base} x2={xoff + width} y2={yoff + base} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base * 2} x2={xoff + width} y2={yoff + base * 2} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base * 3} x2={xoff + width} y2={yoff + base * 3} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base * 4} x2={xoff + width} y2={yoff + base * 4} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + height} x2={xoff + width} y2={yoff + height} stroke={"black"} strokeWidth={2} />

      {/* chord name */}
      <text x={xoff / 2 + width / 2} y={yoff / 2} fontSize={36} stroke={"black"} fill={"black"}>{chord.name}</text>

      {chord.strings.map(function (row: { gstring: number, fret: number, strum?: boolean }) {
        let gstring = row.gstring - 1

        if (row.strum ?? true) {
          let cx = xoff / 3
          let cy = yoff + base * gstring
          let radius = base / 3
          let fill = "green"

          if (row.fret == 0) {
            fill = "white"
            radius = base / 4
          } else if (row.fret == 1) {
            cx = xoff + base
          } else if (row.fret > 1) {
            cx = xoff + base * (row.fret + 1) + base * (row.fret - 2)
          }

          return (<circle cx={cx} cy={cy} r={radius} stroke={"black"} strokeWidth={2} fill={fill} />)
        } else {
          let x = base / 2
          let y1 = yoff * 1.15 + base * gstring
          let y2 = yoff * 0.75 + base * gstring
          let off = 15

          return (
            [
              <line x1={off} y1={y1} x2={x + off} y2={y2} stroke={"black"} strokeWidth={2} />,
              <line x1={x + off} y1={y1} x2={off} y2={y2} stroke={"black"} strokeWidth={2} />
            ]
          )
        }
      })}
    </svg>
  )
}
