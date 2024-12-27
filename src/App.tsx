import { Container, Navbar } from 'react-bootstrap';

function App() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Aurora Lights Simulator</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="mt-4" />
      <Container>Hello world!</Container>
    </>
  );
}

export default App;
