import Guitar from '../components/guitar'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout home>
      <Guitar chord={[[0, 1, true], [1, 2, true], [2, 4, true], [3, 5, true], [0, 3, true], [0, 6, false]]} />
    </Layout>
  )
}
