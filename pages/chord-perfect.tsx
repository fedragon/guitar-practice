import 'bootstrap/dist/css/bootstrap.css'
import { ChordSelector } from '../components/chord-selector'
import { Timer } from '../components/timer'

export default function ChordPerfect() {
  return (
    <ChordSelector rightSide={<Timer time={60} />} />
  )
}
