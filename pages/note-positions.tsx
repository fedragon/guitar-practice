import { Col, Row } from 'react-bootstrap'
import { NoteSelector } from '../components/note-selector'
import { Timer } from '../components/timer'

export default function NotePositions() {
  return (
    <Row>
      <Col><NoteSelector /></Col>
      <Col><Timer time={60} /></Col>
    </Row>
  )
}
