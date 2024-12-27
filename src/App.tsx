import { Container, Navbar } from 'react-bootstrap';
import ControllerSettings from './components/ControllerSettings.tsx';
import ControllerDetails from './components/ControllerDetails.tsx';

function App() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>Aurora Lights Simulator</Navbar.Brand>
        </Container>
      </Navbar>
      <div className="mt-4" />
      <Container>
        <ControllerSettings />
        <ControllerDetails />
      </Container>
    </>
  );
}

export default App;
