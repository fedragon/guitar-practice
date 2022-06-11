import 'bootstrap/dist/css/bootstrap.css'
import { AppProps } from 'next/app'
import { Container, Nav, Navbar } from 'react-bootstrap'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Container fluid>
      <Navbar>
        <Container>
          <Navbar.Brand href="/">Guitar Practice</Navbar.Brand>
          <Nav className={"me-auto"}>
            <Nav.Link href="/chord-perfect">Chord Perfect</Nav.Link>
            <Nav.Link href="/chord-switch">Chord Switch</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Component {...pageProps} />
    </Container>
  )
}
