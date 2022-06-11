import Guitar from '../components/guitar'
import Layout from '../components/layout'

export default function Home() {
  return (
    <Layout home>
      <Guitar chord={{
        name: "C Major",
        strings: [
          { gstring: 1, fret: 0 },
          { gstring: 2, fret: 1 },
          { gstring: 3, fret: 0 },
          { gstring: 4, fret: 2 },
          { gstring: 5, fret: 3 },
          { gstring: 6, fret: 0, strum: false }
        ],
      }} />
    </Layout>
  )
}
