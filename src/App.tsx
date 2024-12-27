import { Container, Navbar } from 'react-bootstrap';
import ControllerSettings from './components/ControllerSettings';
import ControllerDetails from './components/ControllerDetails';
import LightsControllerOverview from "./components/LightsControllerOverview";

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
        <div>
          <LightsControllerOverview />
        </div>
      </Container>
    </>
  );
}

export default App;
