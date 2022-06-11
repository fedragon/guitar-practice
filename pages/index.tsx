import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Stack } from 'react-bootstrap'
import { AllChords } from '../components/chords'
import Guitar from '../components/guitar'

export default function Home() {
  const [chord, setChord] = useState(AllChords[0])
  const [isTimerActive, setTimer] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      let timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      return () => clearTimeout(timer)
    } else {
      resetTimer()
    }
  }, [isTimerActive])

  let resetTimer = function () {
    setTimer(false)
    setTimeLeft(60)
  }

  return (
    <Container fluid>
      <Stack>
        <Stack direction={"horizontal"} gap={2}>
          <ButtonGroup>
            {AllChords.map(function (chord) {
              return (
                <Button
                  key={chord.name}
                  variant={"outline-primary"}
                  size={"sm"}
                  onClick={() => { setChord(chord); resetTimer() }}>
                  {chord.name}
                </Button>
              )
            })}
          </ButtonGroup>
        </Stack>
        <Guitar key={"guitar"} chord={chord} />
        <Stack direction={"horizontal"} gap={1}>
          <div key={"timeLeft"} style={{ fontSize: 36 }}>Time left: {timeLeft}</div>
          <Button key={"play"} onClick={() => { setTimer(true) }} disabled={isTimerActive}>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
          <Button key={"pause"} onClick={() => { setTimer(false) }} disabled={!isTimerActive}>
            <FontAwesomeIcon icon={faPause} />
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
