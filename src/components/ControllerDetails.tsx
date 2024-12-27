import { useContext } from 'react';
import { Spinner, Table } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { LightsContext } from '../context/LightsContext';
import { SocketConnectionState, SocketContext } from '../context/SocketContext';

export default function ControllerDetails() {
  const authContext = useContext(AuthContext);
  const socketContext = useContext(SocketContext);
  const lightsGroupsContext = useContext(LightsContext);

  if (authContext.loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (authContext.user == null) {
    return (
      <div>
        <p className="fst-italic">No valid API key given. Unauthenticated.</p>
      </div>
    );
  }

  const getSocketConnection = () => {
    switch (socketContext.connection) {
      case SocketConnectionState.CONNECTED:
        return <span className="text-success fw-bold">CONNECTED</span>;
      case SocketConnectionState.DISCONNECTED:
        return <span className="text-danger">Disconnected</span>;
      case SocketConnectionState.CONNECTING:
        return <span className="text-warning">Connecting...</span>;
    }
  };

  return (
    <div>
      <Table striped>
        <tbody>
          <tr className="me-1">
            <td>Controller Name</td>
            <td>{authContext.user.name}</td>
          </tr>
          <tr>
            <td>Controller ID</td>
            <td>{authContext.user.lightsControllerId}</td>
          </tr>
          <tr>
            <td>SocketIO</td>
            <td>{getSocketConnection()}</td>
          </tr>
        </tbody>
      </Table>
      <p className="fst-italic">
        * NOTE: Fixtures might support more colors than RGB (i.e. Cold White, Warm White, UV, Amber). These colors
        cannot be easily displayed within a web browser, so effects will look different on physical hardware.
      </p>
    </div>
  );
}
