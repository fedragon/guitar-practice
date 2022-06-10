export default function Guitar() {
  let base = 75
  let offsetX = base
  let maxWidth = base * 8
  let maxHeight = base * 5

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 700" >
      { /* open strings */ }
      <line x1={0} y1={maxHeight - 12.5} x2={50} y2={maxHeight - 62.5} stroke={"black"} strokeWidth={3} />
      <line x1={50} y1={maxHeight - 12.5} x2={0} y2={maxHeight - 62.5} stroke={"black"} strokeWidth={3} />

      {/* nut */}
      <line x1={offsetX} y1={0} x2={offsetX} y2={maxHeight} stroke={"black"} strokeWidth={15} />

      {/* frets */}
      <line x1={offsetX + 150} y1={0} x2={offsetX + 150} y2={maxHeight} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX + 300} y1={0} x2={offsetX + 300} y2={maxHeight} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX + 450} y1={0} x2={offsetX + 450} y2={maxHeight} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX + maxWidth} y1={0} x2={offsetX + maxWidth} y2={maxHeight} stroke={"black"} strokeWidth={2} />

      {/* strings */}
      <line x1={offsetX} y1={0} x2={offsetX + maxWidth} y2={0} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX} y1={75} x2={offsetX + maxWidth} y2={75} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX} y1={150} x2={offsetX + maxWidth} y2={150} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX} y1={225} x2={offsetX + maxWidth} y2={225} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX} y1={300} x2={offsetX + maxWidth} y2={300} stroke={"black"} strokeWidth={2} />
      <line x1={offsetX} y1={maxHeight} x2={offsetX + maxWidth} y2={maxHeight} stroke={"black"} strokeWidth={2} />

      {/* chord */}
      <circle cx={offsetX + 75} cy={75} r={20} stroke={"black"} strokeWidth={2} fill={"red"} />
      <circle cx={offsetX + 225} cy={225} r={20} stroke={"black"} strokeWidth={2} fill={"red"} />
      <circle cx={offsetX + 375} cy={300} r={20} stroke={"black"} strokeWidth={2} fill={"red"} />
    </svg>
  )
}