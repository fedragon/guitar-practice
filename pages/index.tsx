import { useEffect, useState } from 'react'
import { Chords } from '../components/chords'
import Guitar from '../components/guitar'
import Layout from '../components/layout'

export default function Home() {
  const [chord, setChord] = useState(Chords[0])
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

  let toggleTimer = function () {
    setTimer(!isTimerActive)
  }

  let resetTimer = function () {
    setTimer(false)
    setTimeLeft(60)
  }

  return (
    <Layout home>
      {Chords.map(function (chord) {
        return (
          [
            <button key={chord.name} onClick={() => { setChord(chord); resetTimer() }}>{chord.name}</button>,
            <span>&nbsp;</span>
          ]
        )
      })}
      <Guitar key={"guitar"} chord={chord} />
      <div key={"timeLeft"} style={{ fontSize: 36 }}>Time left: {timeLeft}</div>
      <button key={"startstop"} onClick={() => { toggleTimer() }}>
        {isTimerActive ? "Pause" : "Resume"}
      </button>
    </Layout>
  )
}
