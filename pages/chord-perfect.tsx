import { Col, Row } from 'react-bootstrap'
import { ChordSelector } from '../components/chord-selector'
import { Timer } from '../components/timer'

export default function ChordPerfect() {
  return (
    <Row>
      <Col><ChordSelector /></Col>
      <Col><Timer time={60} /></Col>
    </Row>
  )
}
