import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPause, faPlay, faStop } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap'
import { ChordSelector } from '../components/chord-selector'

export default function ChordPerfect() {
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

  let rightSide = (
    <Stack>
      <div key={"timeLeftLabel"}>Time left</div>
      <div key={"timeLeft"} style={{ fontSize: 48 }}>{timeLeft}s</div>
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
  )

  return (
    <ChordSelector
      onClick={() => resetTimer()}
      rightSide={rightSide}
    />
  )
}
