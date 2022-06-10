export default function Guitar() {
  let base = 75
  let nutOffset = base
  let width = base * 8
  let height = base * 5

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 700" >
      { /* open strings */}
      <line x1={0} y1={height - base / 6} x2={base / 3 * 2} y2={height - base / 6 * 5} stroke={"black"} strokeWidth={3} />
      <line x1={base / 3 * 2} y1={height - base / 6} x2={0} y2={height - base / 6 * 5} stroke={"black"} strokeWidth={3} />

      {/* nut */}
      <line x1={nutOffset} y1={0} x2={nutOffset} y2={height} stroke={"black"} strokeWidth={15} />

      {/* frets */}
      <line x1={nutOffset + width / 4} y1={0} x2={nutOffset + width / 4} y2={height} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset + width / 2} y1={0} x2={nutOffset + width / 2} y2={height} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset + width / 4 * 3} y1={0} x2={nutOffset + width / 4 * 3} y2={height} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset + width} y1={0} x2={nutOffset + width} y2={height} stroke={"black"} strokeWidth={2} />

      {/* strings */}
      <line x1={nutOffset} y1={0} x2={nutOffset + width} y2={0} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset} y1={base} x2={nutOffset + width} y2={base} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset} y1={base * 2} x2={nutOffset + width} y2={base * 2} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset} y1={base * 3} x2={nutOffset + width} y2={base * 3} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset} y1={base * 4} x2={nutOffset + width} y2={base * 4} stroke={"black"} strokeWidth={2} />
      <line x1={nutOffset} y1={height} x2={nutOffset + width} y2={height} stroke={"black"} strokeWidth={2} />

      {/* chord */}
      <circle cx={nutOffset + base} cy={base} r={20} stroke={"black"} strokeWidth={2} fill={"red"} />
      <circle cx={nutOffset + base * 3} cy={base * 3} r={20} stroke={"black"} strokeWidth={2} fill={"red"} />
      <circle cx={nutOffset + base * 5} cy={base * 4} r={20} stroke={"black"} strokeWidth={2} fill={"red"} />
    </svg>
  )
}