export default function Guitar({
  chord
}: {
  chord: [number, number, boolean][]
}) {
  let base = 75
  let xoff = base + 25
  let yoff = 50
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

      {/* strings */}
      <line x1={xoff} y1={yoff} x2={xoff + width} y2={yoff} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base} x2={xoff + width} y2={yoff + base} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base * 2} x2={xoff + width} y2={yoff + base * 2} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base * 3} x2={xoff + width} y2={yoff + base * 3} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + base * 4} x2={xoff + width} y2={yoff + base * 4} stroke={"black"} strokeWidth={2} />
      <line x1={xoff} y1={yoff + height} x2={xoff + width} y2={yoff + height} stroke={"black"} strokeWidth={2} />

      {chord.map(function (row: [number, number, boolean]) {
        const [fret, str, strum] = row

        let gstring = str - 1

        if (strum) {
          let cx = xoff / 3
          let cy = yoff + base * gstring
          let radius = base / 3
          let fill = "red"

          if (fret == 0) {
            fill = "white"
            radius = base / 3
          } else if (fret == 1) {
            cx = xoff + base
          } else if (fret > 1) {
            cx = xoff + base * (fret + 1) + base * (fret - 2)
          }

          return (<circle cx={cx} cy={cy} r={radius} stroke={"black"} strokeWidth={2} fill={fill} />)
        } else {
          let x = base / 1.5
          let y1 = yoff + base * gstring * 1.05
          let y2 = yoff + base * gstring * 0.95

          return (
            [
              <line x1={10} y1={y1} x2={x + 10} y2={y2} stroke={"black"} strokeWidth={3} />,
              <line x1={x + 10} y1={y1} x2={10} y2={y2} stroke={"black"} strokeWidth={3} />
            ]
          )
        }
      })}
    </svg>
  )
}