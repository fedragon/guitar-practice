import { faPause, faPlay, faStop } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Button, Stack } from "react-bootstrap"
import useSound from "use-sound"

export function Timer({ time }: { time: number }) {
  const [isTimerActive, setTimer] = useState(false)
  const [timeLeft, setTimeLeft] = useState(time)
  const [play] = useSound('/sounds/tick.mp3')

  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      let timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)

      if (timeLeft > 0 && timeLeft <= 5) {
        play()
      }

      return () => clearTimeout(timer)
    }
  })

  let resetTimer = function () {
    setTimer(false)
    setTimeLeft(time)
  }

  return (
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
}