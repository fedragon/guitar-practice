import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Button, ButtonGroup, Container, Stack } from 'react-bootstrap'
import { AllChords } from '../components/chords'
import Fretboard from '../components/fretboard'

export default function ChordPerfect() {
  const [chord, setChord] = useState(AllChords[0])
  const [isTimerActive, setTimer] = useState(false)
  const [timeLeft, setTimeLeft] = useState(60)

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      let timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      return () => clearTimeout(timer)
    }
  })

  let resetTimer = function () {
    setTimer(false)
    setTimeLeft(60)
  }

  return (
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
      <Stack direction={"horizontal"} gap={3}>
        <Fretboard key={"fretboard"} config={{ base: 45 }} chord={chord} />
        <Stack>
          <Stack>
            <div key={"timeLeftLabel"}>Time left</div>
            <div key={"timeLeft"} style={{ fontSize: 48 }}>{timeLeft}</div>
            <Stack direction={"horizontal"} gap={1}>
              <Button key={"play"} onClick={() => { setTimer(true) }} disabled={isTimerActive}>
                <FontAwesomeIcon icon={faPlay} />
              </Button>
              <Button key={"pause"} onClick={() => { setTimer(false) }} disabled={!isTimerActive}>
                <FontAwesomeIcon icon={faPause} />
              </Button>
              <Button key={"stop"} onClick={() => { resetTimer() }}>
                <FontAwesomeIcon icon={faStop} />
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  )
}
